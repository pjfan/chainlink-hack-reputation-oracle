import { task } from "hardhat/config"
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { networkConfig } from "../helper-hardhat-config"

task("verify-contracts", "verify deployed api consumer contracdt").setAction(
  async (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment): Promise<void> => {
  const { deployments, getNamedAccounts, getChainId } = hre

  const { deploy, log, get } = deployments

  const { deployer } = await getNamedAccounts()
  const chainId = await getChainId()

  let linkTokenAddress: string | undefined
  let oracle: string | undefined
  let additionalMessage: string = ``
  //set log level to ignore non errors
  hre.ethers.utils.Logger.setLogLevel(hre.ethers.utils.Logger.levels.ERROR)

  if (chainId === `31337`) {
    let linkToken = await get(`LinkToken`)
    let MockOracle = await get(`MockOracle`)
    linkTokenAddress = linkToken.address
    oracle = MockOracle.address
    additionalMessage = ` --linkaddress ${linkTokenAddress}`
  } else {
    linkTokenAddress = networkConfig[chainId].linkToken
    oracle = networkConfig[chainId].oracle
  }

  const jobId = hre.ethers.utils.toUtf8Bytes(networkConfig[chainId].jobId!)
  const fee = networkConfig[chainId].fee
  const networkName = networkConfig[chainId].name

  await hre.run('verify:verify', {
    // TODO replace with your own API Consumer contract address.
    address: '0x0C3F161489E265f6b4d8Aa04f27F3CdC9346dED6',
    constructorArguments: [
      oracle,
      jobId,
      fee,
      linkTokenAddress
    ],
  });
  },
)
