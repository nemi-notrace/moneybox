import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useCatch,
  useTransition,
} from "@remix-run/react";

import { db } from "~/utils/db.server";
import {
  unstable_createFileUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import {
  Box,
  VStack,
  Text,
  Container,
  Progress,
  Center,
  Image,
  Button,
  Input,
} from "@chakra-ui/react";
import fs from "fs-extra";
import {
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
} from "@remix-run/node";
export const loader: LoaderFunction = async ({ request }) => {
  return json({});
};

const regex = new RegExp("[0-9]+");

function validatePrice(price: string) {
  if (price.length < 1 || !regex.test(price)) {
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
    img: string;
  };
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

// export async function uploadImg(request: Request){
//   const form = await unstable_parseMultipartFormData(
//     request,
//     uploadHandler
//   )

//   const file = formData.get("img")?toString() || ""
//   return file
// }

export const action: ActionFunction = async ({ request }) => {
  //const form = await request.formData();
  const uploadHandler = unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
      directory: "./public/uploads",
      file: ({ filename }) => filename,
    }),
    unstable_createMemoryUploadHandler()
  );

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );
  const name = formData.get("name");
  const price = formData.get("price");
  const img = JSON.parse(JSON.stringify(formData.get("img"))).name || "";
  console.log(typeof name);
  console.log(typeof price);
  console.log();

  if (
    typeof name !== "string" ||
    typeof price !== "string" ||
    typeof img !== "string"
  ) {
    console.log("1");
    return badRequest({ formError: `Form not submitted correctly.` });
  }
  const fieldErrors = {
    name: validateName(name),
    price: validatePrice(price),
    img: false,
  };
  console.log("2");

  const fields = { name, price, img };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }
  console.log("3");

  const product = await db.product.create({
    data: { ...fields },
  });
  console.log("4");

  return redirect(`/`);
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
      return <div></div>;
    }
  }

  return (
    <Center>
      <Box border="1px" padding={5} margin={5} width={600}>
        <Text fontSize="xl"> Ein neues Ziel hinzufügen</Text>

        <Form method="post" encType="multipart/form-data">
          <Box padding={1}>
            <Text>Name: </Text>
            <Input
              placeholder="z.B. Schuhe"
              type="text"
              defaultValue={actionData?.fields?.name}
              name="name"
              aria-invalid={Boolean(actionData?.fieldErrors?.name)}
              aria-errormessage={
                actionData?.fieldErrors?.name ? "name-error" : undefined
              }
            />

            {actionData?.fieldErrors?.name ? (
              <p className="form-validation-error" role="alert" id="name-error">
                <Text color="red.400">{actionData.fieldErrors.name}</Text>
              </p>
            ) : null}
          </Box>
          <Box padding={1}>
            <label>
              <Text>Preis in Cent: </Text>
              <Input
                placeholder="2000"
                defaultValue={actionData?.fields?.price}
                name="price"
                aria-invalid={Boolean(actionData?.fieldErrors?.price)}
                aria-errormessage={
                  actionData?.fieldErrors?.price ? "price-error" : undefined
                }
              />
            </label>
            {actionData?.fieldErrors?.price ? (
              <p
                className="form-validation-error"
                role="alert"
                id="price-error"
              >
                <Text color="red.400"> {actionData.fieldErrors.price} </Text>
              </p>
            ) : null}
          </Box>
          <Box padding={1}>
            Bild hinzufügen
            <Input type="file" id="img" name="img" accept="image/*" />
          </Box>
          <Box padding={1}>
            {actionData?.formError ? (
              <p className="form-validation-error" role="alert">
                <Text color="red.400">{actionData.formError}</Text>
              </p>
            ) : null}
            <Button type="submit" className="button">
              Hinzufügen
            </Button>
          </Box>
        </Form>
      </Box>
    </Center>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return <div>Sorry about that.</div>;
}
