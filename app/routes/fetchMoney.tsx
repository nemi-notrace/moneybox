import { json } from "@remix-run/node";
import { useEffect, useRef, useState } from "react";
import { useSocket } from "~/context";
import { useActionData, useFetcher, useLoaderData } from "@remix-run/react";
import { Box, VStack, Text, Container, Progress } from "@chakra-ui/react";
import fs from "fs-extra";
import { HStack } from "@chakra-ui/react";
//import TTS from 'text-to-speech-offline'
type LoaderData = {
  productItems: Array<{
    id: string;
    title: string;
    price: string;
    image: string;
  }>;
  money: number;
};
export async function loader() {
  const data: LoaderData = {
    productItems: [
      {
        id: "0",
        title: "test",
        price: "0",
        image: "/1.jpg",
      },
    ],
    money: parseInt(
      fs.readFileSync(
        "/home/john/workspace/moneybox/socket.io/money.txt",
        "utf8"
      )
    ),
  };

  return json(data);
}
