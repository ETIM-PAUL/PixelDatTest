import { http, createConfig } from '@wagmi/core'
import { bscTestnet } from '@wagmi/core/chains'

export const BUSD = "0xCC933412b0323333108E51A6A4D9A3369CA05347";
export const BUSDHandler = "0x3F9d9eedeA22cD87A78F11d5acF18005E066952f";


export const config = createConfig({
  chains: [bscTestnet],
  transports: {
    [bscTestnet.id]: http(),
  },
})