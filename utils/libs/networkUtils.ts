import NetInfo from '@react-native-community/netinfo';

export const checkInternetConnection = async (): Promise<boolean> => {
  const state = await NetInfo.fetch();
  return state.isConnected === true && state.isInternetReachable === true;
};

export const getNetworkErrorMessage = (): string => {
  return 'Compruebe su conexión a internet.';
}; 