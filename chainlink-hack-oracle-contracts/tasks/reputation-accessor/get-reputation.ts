import { task } from "hardhat/config"
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { ReputationAccessor, ReputationAccessor__factory } from "../../typechain"
import { BigNumber, constants } from "ethers"

task("get-reputation", "Calls an Reputation Accessor Contract to read data obtained from an external API")
  .addParam("contract", "The address of the Reputation Accessor contract that you want to call")
  .addParam("accessorcontract", "The address of the Oracle consumer accessor contract that you want to call")
  .setAction(async (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment): Promise<void> => {
    const contractAddr: string = taskArgs.contract
    const accessorContractAddr: string = taskArgs.accessorcontract
    const networkId: string = hre.network.name

    console.log(`Reading data from Reputation Accessor contract ${contractAddr} on network ${networkId}`)

    //Get signer information
    const accounts: SignerWithAddress[] = await hre.ethers.getSigners()
    const signer: SignerWithAddress = accounts[0]

    const ReputationAccessorContract: ReputationAccessor = ReputationAccessor__factory.connect(contractAddr, signer)

    const result: BigNumber = await ReputationAccessorContract.getReputationScore(accessorContractAddr)
    console.log(`Data is: ${result}`)

    if (result == constants.Zero && ["hardhat", "localhost", "ganache"].indexOf(hre.network.name) == 0) {
      console.log("You'll either need to wait another minute, or fix something!")
    }

    if (["hardhat", "localhost", "ganache"].indexOf(hre.network.name) >= 0) {
      console.log("You'll have to manually update the value since you're on a local chain!")
    }
  })
