import { useState, useEffect } from "react";
import Link from "next/link";
import Navmenu from "./Navmenu";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import { RainbowKitProvider, Theme } from '@rainbow-me/rainbowkit';


export default function Navbar() {
  const { data: account } = useAccount();
  const { disconnect } = useDisconnect();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <header className="bg-white border-b-2 border-gray-100">
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          aria-label="Top"
        >
          <div className="w-full py-6 flex flex-wrap items-center justify-between border-b border-indigo-500 lg:border-none">
            <div className="flex items-center">
              <Link href="/">
                <a>METSO Fun</a>
              </Link>
            </div>
            <div className="ml-10 space-x-4 flex items-center">
              <Link href="/create-event">
                <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black-700 border border-red-400 hover:bg-red-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                  Crear Evento
                </a>
                </Link>
                {account ? (
                    <Navmenu account={account} disconnect={() => disconnect()} />
                ) : (
                    <ConnectButton />
                )}
            </div>
          </div>
        </nav>
      </header>
    )
  );
}
