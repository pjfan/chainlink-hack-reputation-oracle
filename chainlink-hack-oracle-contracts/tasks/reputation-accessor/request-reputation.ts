import { networkConfig, getNetworkIdFromName } from "../../helper-hardhat-config"
import { task } from "hardhat/config"
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { ReputationAccessor, ReputationAccessor__factory } from "../../typechain"
import { ContractTransaction } from "ethers"

task("request-reputation", "Calls an Reputation Accessor Contract to request external data")
  .addParam("contract", "The address of the Reputation Accessor contract that you want to call")
  .addParam("accessorcontract", "The address of the Oracle Accessor API contract that you want to call")
  .addParam("query", "The query of the account whose reputation that you want to look up")
  .setAction(async (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment): Promise<void> => {
    const contractAddr: string = taskArgs.contract
    const query: string = taskArgs.query
    const accessorContractAddr: string = taskArgs.accessorcontract
    const networkId: string | null = await getNetworkIdFromName(hre.network.name)

    if (!networkId) return

    console.log(`Calling Reputation Accessor contract ${contractAddr} on network ${hre.network.name}`)

    //Get signer information
    const accounts: SignerWithAddress[] = await hre.ethers.getSigners()
    const signer: SignerWithAddress = accounts[0]

    //Create connection to API Consumer Contract and call the createRequestTo function
    const reputationAccessorContract: ReputationAccessor = ReputationAccessor__factory.connect(contractAddr, signer)

    const tx: ContractTransaction = await reputationAccessorContract.requestReputationScore(
      accessorContractAddr,
      query
    )

    console.log(
      `Contract ${contractAddr} external data request successfully called. Transaction Hash: ${tx.hash}\n`,
      `Run the following to read the returned result:\n`,
      `npx hardhat get-reputation --contract ${contractAddr} --accessorcontract ${accessorContractAddr} --network ${hre.network.name}`,
    )
  })
