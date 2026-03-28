import { config, getServerKeypair, StellarNetwork } from '../config';

const FRIENDBOT_URL = 'https://friendbot.stellar.org';
type HorizonBalance = {
  asset_type: string;
  balance: string;
};

type HorizonAccountResponse = {
  balances: HorizonBalance[];
};

export const ensureAccountFunded = async () => {
  if (config.network === StellarNetwork.MAINNET) {
    console.log('🔒 Mainnet detected: Skipping auto-funding.');
    return;
  }

  const keypair = getServerKeypair();
  const publicKey = keypair.publicKey();

  try {
    console.log(`🔎 Checking balance for ${publicKey.slice(0, 8)}...`);

    const response = await fetch(`${config.horizonUrl}/accounts/${publicKey}`);

    if (response.status === 404) {
      console.log('⚠️ Account not found on ledger. Requesting Friendbot...');
      await invokeFriendbot(publicKey);
      return;
    }

    const data = (await response.json()) as HorizonAccountResponse;
    const nativeBalance = data.balances.find(
      (balance) => balance.asset_type === 'native',
    );

    if (nativeBalance && parseFloat(nativeBalance.balance) < 10) {
      console.log(
        `⚠️ Low balance (${nativeBalance.balance} XLM). Topping up...`,
      );
      await invokeFriendbot(publicKey);
    } else {
      console.log(`✅ Account funded (${nativeBalance?.balance || 0} XLM)`);
    }
  } catch (error) {
    console.error('❌ Funding Check Failed:', error);
  }
};

const invokeFriendbot = async (publicKey: string) => {
  try {
    const friendbotResp = await fetch(`${FRIENDBOT_URL}?addr=${publicKey}`);
    const result = await friendbotResp.json();

    if (friendbotResp.ok) {
      console.log('💰 Friendbot successfully funded the account!');
    } else {
      console.error('❌ Friendbot failed:', result);
    }
  } catch (err) {
    console.error('❌ Could not reach Friendbot:', err);
  }
};
