import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useCatch,
  useTransition,
} from "@remix-run/react";

import { ProductDisplay } from "~/components/product";
import { db } from "~/utils/db.server";
//import { getUserId, requireUserId } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  // const userId = await getUserId(request);
  //   if (!userId) {
  //     throw new Response("Unauthorized", { status: 401 });
  //   }
  return json({});
};

const regex = new RegExp("[0-9]");

function validatePrice(content: string) {
  if (content.length < 1 && regex.test(content)) {
    return `Bitte in cent als numerische Werte eingeben`;
  }
}

function validateName(name: string) {
  if (name.length < 2) {
    return `Der Name ist zu kurz.`;
  }
}

type ActionData = {
  formError?: string;
  fieldErrors?: { name: string | undefined; price: string | undefined };
  fields?: {
    name: string;
    price: string;
  };
};

/**
 * This helper function gives us typechecking for our ActionData return
 * statements, while still returning the accurate HTTP status, 400 Bad Request,
 * to the client.
 */
const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  // const userId = await requireUserId(request);

  const form = await request.formData();
  const name = form.get("name");
  const price = form.get("price");
  console.log(price);
  if (typeof name !== "string" || typeof price !== "string") {
    return badRequest({ formError: `Form not submitted correctly.` });
  }

  const fieldErrors = {
    name: validateName(name),
    price: validatePrice(price),
  };
  const fields = { name, price };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }

  const product = await db.product.create({
    data: { ...fields },
  });
  return redirect(`/products`);
};

export default function NewProductRoute() {
  const actionData = useActionData<ActionData>();
  const transition = useTransition();

  if (transition.submission) {
    const name = transition.submission.formData.get("name");
    const price = transition.submission.formData.get("price");
    if (
      typeof name === "string" &&
      typeof price === "string" &&
      !validatePrice(price) &&
      !validateName(name)
    ) {
      return <ProductDisplay product={{ name, price }} />;
    }
  }

  return (
    <div>
      <p>Ein neues Ziel hinzufügen</p>
      <Form method="post">
        <div>
          <label>
            Name:{" "}
            <input
              type="text"
              defaultValue={actionData?.fields?.name}
              name="name"
              aria-invalid={Boolean(actionData?.fieldErrors?.name)}
              aria-errormessage={
                actionData?.fieldErrors?.name ? "name-error" : undefined
              }
            />
          </label>
          {actionData?.fieldErrors?.name ? (
            <p className="form-validation-error" role="alert" id="name-error">
              {actionData.fieldErrors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label>
            Preis:{" "}
            <textarea
              defaultValue={actionData?.fields?.price}
              name="price"
              aria-invalid={Boolean(actionData?.fieldErrors?.price)}
              aria-errormessage={
                actionData?.fieldErrors?.price ? "price-error" : undefined
              }
            />
          </label>
          {actionData?.fieldErrors?.price ? (
            <p className="form-validation-error" role="alert" id="price-error">
              {actionData.fieldErrors.price}
            </p>
          ) : null}
        </div>
        <div>
          {actionData?.formError ? (
            <p className="form-validation-error" role="alert">
              {actionData.formError}
            </p>
          ) : null}
          <button type="submit" className="button">
            Hinzufügen
          </button>
        </div>
      </Form>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 401) {
    return (
      <div className="error-container">
        <p>Upps.</p>
        <Link to="/login?redirectTo=/jokes/new">Login</Link>
      </div>
    );
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return <div>Sorry about that.</div>;
}
