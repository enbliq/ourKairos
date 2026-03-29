import { config, getServerPublicKey, StellarNetwork } from './config';
import { ensureAccountFunded } from './services/funding';
import './services/diagnostics';

const startStellarService = async () => {
  console.log('🚀 Stellar Service Starting...');
  console.log(`🌍 Network: ${config.network}`);

  try {
    const publicKey = getServerPublicKey();
    console.log(`🔑 Server Wallet: ${publicKey}`);

    if (config.network === StellarNetwork.TESTNET) {
      console.log('🧪 Running in Test Mode');

      await ensureAccountFunded();
    }

    console.log('✅ Service Initialized Successfully');
  } catch (error) {
    console.error('Startup Failed:', error);
    process.exit(1);
  }
};

startStellarService();
