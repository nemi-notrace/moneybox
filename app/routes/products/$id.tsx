import type { product } from "@prisma/client";
import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useCatch, useLoaderData, useParams } from "@remix-run/react";

import { db } from "~/utils/db.server";

export const meta: MetaFunction = ({
  data,
}: {
  data: LoaderData | undefined;
}) => {
  if (!data) {
    return {
      title: "kein Ziel",
      description: "kein Ziel gefunden",
    };
  }
  return {
    title: `"${data.product.name}" `,
    description: `yeah ein neues Ziel: "${data.product.name}"`,
  };
};

type LoaderData = { product: product };

export let loader: LoaderFunction = async ({ request, params }) => {
  let product = await db.product.findFirst({
    where: { id: parseInt(params.id!) },
  });
  console.log(product);

  if (!product) {
    throw new Response("Not found.", { status: 404 });
  }
  let data: LoaderData = { product };
  return json(data, {
    headers: {
      "Cache-Control": `public, max-age=${60 * 5}, s-maxage=${60 * 60 * 24}`,
      Vary: "Cookie",
    },
  });
};

export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData();
  console.log(form);

  const product = await db.product.findUnique({
    where: { id: parseInt(params.id!) },
  });
  console.log("PRODUKT TO DELETE", product);
  if (!product) {
    throw new Response("Man kann nicht löschen was nicht exestiert", {
      status: 404,
    });
  }

  console.log(await db.product.delete({ where: { id: parseInt(params.id!) } }));
  return redirect("/products");
};

export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();
  switch (caught.status) {
    case 400: {
      return (
        <div className="error-container">
          What you're trying to do is not allowed.
        </div>
      );
    }
    case 404: {
      return (
        <div className="error-container">
          Huh? What the heck is {params.jokeId}?
        </div>
      );
    }
    case 401: {
      return (
        <div className="error-container">
          Sorry, but {params.jokeId} is not your product.
        </div>
      );
    }
    default: {
      throw new Error(`Unhandled error: ${caught.status}`);
    }
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  const { jokeId } = useParams();
  return (
    <div className="error-container">
      There was an error loading product by the id {jokeId}. Sorry.
    </div>
  );
}
