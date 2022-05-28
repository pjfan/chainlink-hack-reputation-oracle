import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { networkConfig, autoFundCheck } from "../helper-hardhat-config"

const deployFunction: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getChainId } = hre

  const { log, get } = deployments
  const chainId = await getChainId()

  let linkTokenAddress: string | undefined
  let oracle: string | undefined
  let additionalMessage: string = ``
  //set log level to ignore non errors
  hre.ethers.utils.Logger.setLogLevel(hre.ethers.utils.Logger.levels.ERROR)
  const networkName = networkConfig[chainId].name

  if (chainId === `31337`) {
    const linkToken = await get("LinkToken")
    const MockOracle = await get("MockOracle")
    linkTokenAddress = linkToken.address
    oracle = MockOracle.address
    additionalMessage = ` --linkaddress ${linkTokenAddress}`
  } else {
    linkTokenAddress = networkConfig[chainId].linkToken
    oracle = networkConfig[chainId].oracle
  }

  //Try Auto-fund APIConsumer contract with LINK
  const APIConsumer = await deployments.get("APIConsumer")
  const apiConsumer = await hre.ethers.getContractAt("APIConsumer", APIConsumer.address)

  if (!linkTokenAddress) return

  if (await autoFundCheck(apiConsumer.address, networkName, linkTokenAddress, additionalMessage, hre)) {
    await hre.run(`fund-link`, { contract: apiConsumer.address, linkaddress: linkTokenAddress })
  } else {
    log(`Then run API Consumer contract with following command:`)
    log(`npx hardhat request-data --contract ${apiConsumer.address} --network ${networkName}`)
  }
  log(`----------------------------------------------------`)
}

export default deployFunction
deployFunction.tags = [`all`]
