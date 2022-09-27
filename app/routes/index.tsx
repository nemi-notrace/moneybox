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
  Image,
  Button,
} from "@chakra-ui/react";
import fs from "fs-extra";
import { HStack } from "@chakra-ui/react";
//import TTS from 'text-to-speech-offline'
import { db } from "~/utils/db.server";

type product = {
  id: number;
  name: string;
  price: string;
  img: string;
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
  console.log(product);
  fs.removeSync(`public/uploads/${product?.img}`);
  await db.product.delete({ where: { id: deleteId } });
  if (!product) {
    throw new Response("Man kann nicht löschen was nicht exestiert", {
      status: 404,
    });
  }

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

  //   if (typeof document === "undefined") {
  //       console.log("not on browser")} else {
  //       setTimeout(function(){
  //       let say = "Du hast " + data.money/100 + " Euro gespart."
  //       TTS(say, 'de-DE')
  // }, 500);
  //}
  return (
    <Container>
      <VStack>
        <VStack width="650px" bg="purple.300">
          <Box width="100px">
            <img src="/pig.png" />
          </Box>

          <Box>
            <Text fontSize="3xl">
              Du hast <b>{money / 100}€</b> gespart.
            </Text>
          </Box>
        </VStack>
        {data.productItems.map((item: product, i: number) => {
          const price = parseInt(item.price);
          const missing = (parseInt(item.price) - money) / 100;
          let progressvalue = (money * 100) / price;
          let colorScheme = "red";
          if (progressvalue == price) progressvalue = price;
          if (progressvalue < 99) colorScheme = "orange";
          if (progressvalue >= 100) colorScheme = "green";
          if (missing > 0) {
            return (
              <VStack width="650px" bg="gray.400">
                <HStack>
                  <Box>
                    <Text fontSize="lg">
                      Es fehlen noch <b>{missing} €</b> für <b>{item.name}</b>
                    </Text>

                    <Progress
                      value={(money * 100) / parseInt(item.price)}
                      colorScheme={colorScheme}
                      width="300px"
                    />
                  </Box>
                  <Box width="50px" paddingTop="20px">
                    {parseInt(item.price) / 100} €
                  </Box>
                  <Image
                    boxSize="150px"
                    objectFit="cover"
                    src={`uploads/${item.img}`}
                    alt="Produktbild"
                  />
                  <Form method="delete">
                    <Button
                      name="delete"
                      type="submit"
                      className="button"
                      value={item.id}
                    >
                      Löschen
                    </Button>
                  </Form>
                </HStack>
              </VStack>
            );
          } else {
            return (
              <VStack width="650px" bg="gray.400">
                <HStack>
                  <Box>
                    <Text fontSize="lg">
                      Du kannst dir <b>{item.name} kaufen</b>
                    </Text>

                    <Progress
                      value={(money * 100) / parseInt(item.price)}
                      colorScheme={colorScheme}
                      width="300px"
                    />
                  </Box>
                  <Box width="50px" paddingTop="20px">
                    {parseInt(item.price) / 100} €
                  </Box>
                  <Image
                    boxSize="150px"
                    objectFit="cover"
                    src={`uploads/${item.img}`}
                    alt="Produktbild"
                  />
                  <Form method="delete">
                    <Button
                      name="delete"
                      type="submit"
                      className="button"
                      value={item.id}
                    >
                      Löschen
                    </Button>
                  </Form>
                </HStack>
              </VStack>
            );
          }
        })}
        <Button>
          <Link to="products/new">Neues Ziel Hinzufügen</Link>
        </Button>
      </VStack>
    </Container>
  );
}
