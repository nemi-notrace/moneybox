import {
  json,
  LoaderFunction,
  ActionFunction,
  redirect,
} from "@remix-run/node";
import { useEffect, useRef, useState } from "react";
import { useSocket } from "~/context";
import {
  useActionData,
  useFetcher,
  useLoaderData,
  Outlet,
  Form,
  Link,
} from "@remix-run/react";
import {
  Box,
  VStack,
  Text,
  Container,
  Progress,
  Center,
} from "@chakra-ui/react";
import fs from "fs-extra";
import { HStack } from "@chakra-ui/react";
//import TTS from 'text-to-speech-offline'
import { db } from "~/utils/db.server";

type product = {
  id: number;
  name: string;
  price: string;
  //image: string;
};

type LoaderData = {
  productItems: Array<product>;
  money: number;
};

// export async function loader() {
//   const data: LoaderData = {
//     productItems: [
//       {
//         id: "0",
//         title: "test",
//         price: "0",
//         image: "/1.jpg",
//       },
//     ],
//     money: parseInt(fs.readFileSync("public/money.txt", "utf8")),
//   };

//   return json(data);
// }

export const loader: LoaderFunction = async ({ request, params }) => {
  const products = await db.product.findMany();
  const data: LoaderData = {
    productItems: products,
    money: parseInt(fs.readFileSync("public/money.txt", "utf8")),
  };
  //const data = { products };
  return json(data);
};

export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData();
  const deleteId = parseInt(String(form.get("delete")));

  const product = await db.product.findUnique({
    where: { id: deleteId },
  });
  if (!product) {
    throw new Response("Man kann nicht löschen was nicht exestiert", {
      status: 404,
    });
  }

  console.log(await db.product.delete({ where: { id: deleteId } }));
  return redirect("/");
};

export default function Index() {
  const data = useLoaderData<LoaderData>();
  const [money, setMoney] = useState(data.money);
  const fetcher = useFetcher();
  if (data.money === null || data.money === undefined || data.money === 0) {
    setMoney(0);
  }

  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on("event", (data: LoaderData) => {
      fetcher.load("/fetchMoney");
    });

    socket.emit("event", "ping");
  }, [socket, fetcher]);

  useEffect(() => {
    if (!fetcher.data) return;
    setMoney(fetcher.data.money);
  });
  //console.log(fetcher.data?.money);

  let price = 2000;
  let progressvalue = (money * 100) / price;
  let missingValue = (price - money) / 100;
  if (price < money) missingValue = 0;
  let colorScheme = "red";
  if (progressvalue == price) progressvalue = price;
  if (progressvalue < 99) colorScheme = "orange";
  if (progressvalue >= 100) colorScheme = "green";
  //   if (typeof document === "undefined") {
  //       console.log("not on browser")} else {
  //       setTimeout(function(){
  //       let say = "Du hast " + data.money/100 + " Euro gespart."
  //       TTS(say, 'de-DE')
  // }, 500);
  //}
  console.log("DATA");
  return (
    <Container>
      <VStack>
        <VStack width="600px" bg="purple.300">
          <Box width="100px">
            <img src="/pig.png" />
          </Box>

          <Box>
            <Text fontSize="3xl">
              Du hast <b>{money / 100}€</b> gespart.
              {console.log(money)}
            </Text>
          </Box>
        </VStack>
        {data.productItems.map((item: product, i: number) => {
          return (
            <VStack width="600px" bg="gray.400">
              <HStack>
                <Box>
                  <HStack>
                    <Box>
                      Es fehlen noch{" "}
                      <b>{(parseInt(item.price) - money) / 100} €</b> für:
                      <Center>
                        <p>{item.name}</p>
                      </Center>
                      <Progress
                        value={(money * 100) / parseInt(item.price)}
                        colorScheme={colorScheme}
                      />
                    </Box>
                    <Box paddingTop="20px">
                      <Text fontSize="lg">{price / 100} €</Text>
                    </Box>
                  </HStack>
                </Box>

                <Box width="100px">
                  <img src="/schuhe.jpg" />
                </Box>
                <Form method="delete">
                  <button
                    name="delete"
                    type="submit"
                    className="button"
                    value={item.id}
                  >
                    Löschen
                  </button>
                </Form>
              </HStack>
            </VStack>
          );
        })}
        <Link to="products/new">Neues Ziel Hinzufügen</Link>
      </VStack>
    </Container>
  );
}
