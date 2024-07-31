"use client"
import {useSendSponsoredTransaction, useSmartAccount, useUserOpWait} from "@biconomy/use-aa";
import {encodeFunctionData, parseAbi} from "viem";
import {useEffect} from "react";

export const SponsoredTx = () => {
    const { smartAccountAddress } = useSmartAccount();
    const {
        mutate,
        data: userOpResponse,
        error,
        isPending,
    } = useSendSponsoredTransaction();

    const {
        isLoading: waitIsLoading,
        isSuccess: waitIsSuccess,
        error: waitError,
        data: waitData,
    } = useUserOpWait(userOpResponse);

    const mintNftTx = () =>
        mutate({
            transactions: {
                to: "0x1758f42Af7026fBbB559Dc60EcE0De3ef81f665e",
                data: encodeFunctionData({
                    abi: parseAbi(["function safeMint(address _to)"]),
                    functionName: "safeMint",
                    args: [smartAccountAddress],
                }),
            },
        });

    useEffect(() => {
        if (waitData?.success === "true") {
            console.log(waitData?.receipt?.transactionHash);
        }
    }, [waitData]);

    return (
        <div>
            <button type="button" onClick={mintNftTx}>
                {waitIsLoading || isPending ? "Executing..." : "Mint an NFT"}
            </button>
            {(error || waitError) ?? ""}
        </div>
    );
}