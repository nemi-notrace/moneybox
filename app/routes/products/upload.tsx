import type { ActionFunction } from "@remix-run/node";
import {
  redirect,
  unstable_createFileUploadHandler,
  unstable_parseMultipartFormData,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
} from "@remix-run/node";
import { Form } from "@remix-run/react";

export const action: ActionFunction = async ({ request }) => {
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

  const title = formData.get("title");
  const fileId = formData.get("file");
  console.log("title: ", title, "file: ", fileId);
  return redirect(``);
};

export default function Index() {
  return (
    <div>
      <h1>Upload Test #2</h1>
      <Form method="post" encType="multipart/form-data">
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" />

        <label htmlFor="file">File</label>
        <input type="file" id="file" name="file" accept="application/pdf" />

        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}
