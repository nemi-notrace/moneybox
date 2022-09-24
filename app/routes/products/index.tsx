//import type { Joke } from "@prisma/client";
import { useAccordionItemState } from "@chakra-ui/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useCatch, useLoaderData } from "@remix-run/react";

import { db } from "~/utils/db.server";
//import { getUserId } from "~/utils/session.server";

//type LoaderData = { randomJoke: Joke };

export const loader: LoaderFunction = async ({ request, params }) => {
  //const userId = await getUserId(request);
  //const count = await db.joke.count();
  // const randomRowNumber = Math.floor(Math.random() * count);

  // in the official deployed version of the app, we don't want to deploy
  // a site with unmoderated content, so we only show users their own jokes
  const products = await db.product.findMany();
  //     : [];
  //   if (!randomJoke) {
  //     throw new Response("No jokes to be found!", { status: 404 });
  //   }
  const data = { products };
  //
  //const data = "";
  return json(products);
};

export default function ProductsIndexRoute() {
  const data = useLoaderData<any>();
  data.map((item: any, i: number) => {
    console.log(item.name);
  });
  return (
    <div>
      {data
        ? data.map((item: any, i: number) => {
            return (
              <div key={i}>
                <p>{item.name}</p>
                <p>{item.price}</p>
              </div>
            );
          })
        : "Bitte füge ein neues Ziel hinzu."}
      <Link to="new">Neues Ziel Hinzufügen</Link>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return (
      <div className="error-container">
        <p>There are no products to display.</p>
        <Link to="new">Neues Ziel Hinzufügen</Link>
      </div>
    );
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return <div>I did a whoopsies.</div>;
}
