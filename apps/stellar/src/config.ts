import dotenv from 'dotenv';
import { Keypair } from '@stellar/stellar-sdk';

dotenv.config();

export enum StellarNetwork {
  TESTNET = 'TESTNET',
  MAINNET = 'MAINNET',
}

interface AppConfig {
  network: StellarNetwork;
  horizonUrl: string;
  secretKey: string;
}

const getEnvVar = (key: string, required: boolean = true): string => {
  const value = process.env[key];
  if (required && !value) {
    throw new Error(`❌ Missing required environment variable: ${key}`);
  }
  return value || '';
};

const networkInput = getEnvVar('STELLAR_NETWORK', false) || 'TESTNET';
const network =
  networkInput.toUpperCase() === 'MAINNET'
    ? StellarNetwork.MAINNET
    : StellarNetwork.TESTNET;

export const config: AppConfig = {
  network,
  horizonUrl:
    getEnvVar('STELLAR_HORIZON_URL', false) ||
    'https://horizon-testnet.stellar.org',
  secretKey: getEnvVar('STELLAR_SECRET_KEY', true),
};

export const getServerKeypair = (): Keypair => {
  try {
    return Keypair.fromSecret(config.secretKey);
  } catch {
    throw new Error(
      "❌ Invalid STELLAR_SECRET_KEY format. Ensure it starts with 'S'.",
    );
  }
};

export const getServerPublicKey = (): string => {
  return getServerKeypair().publicKey();
};
