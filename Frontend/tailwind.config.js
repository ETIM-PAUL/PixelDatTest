
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {}
  },
  plugins: []
};  
// forge create --rpc-url https://scroll-testnet.rpc.grove.city/v1/a7a7c8e2 \    --constructor-args 0xCC933412b0323333108E51A6A4D9A3369CA05347 \
//     --private-key bd83404727a183edcc32ce0c9a7e07e004b179f65a14c8aca8f106e2cc73556a \
//     --etherscan-api-key G4S17BE53N8NGZXIWHMRR4FPBM29J7PM3B \
//     --verify \
//     src/EventFactory.sol:EventFactory