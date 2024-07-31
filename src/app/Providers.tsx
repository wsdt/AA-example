"use client";
import { http } from "viem";
import { BiconomyProvider } from "@biconomy/use-aa";
import {sepolia} from "viem/chains";
import { WagmiProvider, createConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const config = createConfig({
    chains: [sepolia],
    transports: {
        [sepolia.id]: http()
    }
});

export default function Providers({ children }: { children: React.ReactNode }) {
    const biconomyPaymasterApiKey =
        process.env.NEXT_PUBLIC_PAYMASTER_API_KEY || "";
    const bundlerUrl = process.env.NEXT_PUBLIC_BUNDLER_URL || "";

    const queryClient = new QueryClient();

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <BiconomyProvider
                    config={{
                        biconomyPaymasterApiKey,
                        bundlerUrl,
                    }}
                    queryClient={queryClient}
                >
                    {children}
                </BiconomyProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}