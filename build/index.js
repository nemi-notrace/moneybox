var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  entry: () => entry,
  routes: () => routes
});

// node_modules/@remix-run/dev/compiler/shims/react.ts
var React = __toESM(require("react"));

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_server = require("react-dom/server");
var import_react2 = require("@emotion/react");
var import_create_instance = __toESM(require("@emotion/server/create-instance"));
var import_react3 = require("@remix-run/react");

// app/context.tsx
var import_react = require("react");
var ServerStyleContext = (0, import_react.createContext)(null);
var ClientStyleContext = (0, import_react.createContext)(null);
var context = (0, import_react.createContext)(void 0);
function useSocket() {
  return (0, import_react.useContext)(context);
}
function SocketProvider({ socket, children }) {
  return /* @__PURE__ */ React.createElement(context.Provider, {
    value: socket
  }, children);
}

// app/createEmotionCache.ts
var import_cache = __toESM(require("@emotion/cache"));
function createEmotionCache() {
  return (0, import_cache.default)({ key: "css" });
}

// app/entry.server.tsx
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = (0, import_create_instance.default)(cache);
  const html = (0, import_server.renderToString)(/* @__PURE__ */ React.createElement(ServerStyleContext.Provider, {
    value: null
  }, /* @__PURE__ */ React.createElement(import_react2.CacheProvider, {
    value: cache
  }, /* @__PURE__ */ React.createElement(import_react3.RemixServer, {
    context: remixContext,
    url: request.url
  }))));
  const chunks = extractCriticalToChunks(html);
  const markup = (0, import_server.renderToString)(/* @__PURE__ */ React.createElement(ServerStyleContext.Provider, {
    value: chunks.styles
  }, /* @__PURE__ */ React.createElement(import_react2.CacheProvider, {
    value: cache
  }, /* @__PURE__ */ React.createElement(import_react3.RemixServer, {
    context: remixContext,
    url: request.url
  }))));
  responseHeaders.set("Content-Type", "text/html");
  return new Response(`<!DOCTYPE html>${markup}`, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// route:/home/john/workspace/moneybox/socket.io/app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App
});
var import_react4 = require("@remix-run/react");
var import_socket = __toESM(require("socket.io-client"));
var import_react5 = __toESM(require("react"));
var import_react6 = require("@chakra-ui/react");
function App() {
  const [socket, setSocket] = (0, import_react5.useState)();
  (0, import_react5.useEffect)(() => {
    const socket2 = (0, import_socket.default)();
    setSocket(socket2);
    return () => {
      socket2.close();
    };
  }, []);
  (0, import_react5.useEffect)(() => {
    if (!socket)
      return;
    socket.on("confirmation", (data) => {
    });
  }, [socket]);
  return /* @__PURE__ */ import_react5.default.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ import_react5.default.createElement("head", null, /* @__PURE__ */ import_react5.default.createElement(import_react4.Meta, null), /* @__PURE__ */ import_react5.default.createElement(import_react4.Links, null)), /* @__PURE__ */ import_react5.default.createElement("body", null, /* @__PURE__ */ import_react5.default.createElement(import_react6.ChakraProvider, null, /* @__PURE__ */ import_react5.default.createElement(SocketProvider, {
    socket
  }, /* @__PURE__ */ import_react5.default.createElement(import_react4.Outlet, null))), /* @__PURE__ */ import_react5.default.createElement(import_react4.ScrollRestoration, null), /* @__PURE__ */ import_react5.default.createElement(import_react4.Scripts, null), /* @__PURE__ */ import_react5.default.createElement(import_react4.LiveReload, null)));
}

// route:/home/john/workspace/moneybox/socket.io/app/routes/products/upload.tsx
var upload_exports = {};
__export(upload_exports, {
  action: () => action,
  default: () => Index
});
var import_node = require("@remix-run/node");
var import_react7 = require("@remix-run/react");
var action = async ({ request }) => {
  const uploadHandler = (0, import_node.unstable_composeUploadHandlers)((0, import_node.unstable_createFileUploadHandler)({
    directory: "./public/uploads",
    file: ({ filename }) => filename
  }), (0, import_node.unstable_createMemoryUploadHandler)());
  const formData = await (0, import_node.unstable_parseMultipartFormData)(request, uploadHandler);
  const title = formData.get("title");
  const fileId = formData.get("file");
  console.log("title: ", title, "file: ", fileId);
  return (0, import_node.redirect)(``);
};
function Index() {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "Upload Test #2"), /* @__PURE__ */ React.createElement(import_react7.Form, {
    method: "post",
    encType: "multipart/form-data"
  }, /* @__PURE__ */ React.createElement("label", {
    htmlFor: "title"
  }, "Title"), /* @__PURE__ */ React.createElement("input", {
    type: "text",
    name: "title",
    id: "title"
  }), /* @__PURE__ */ React.createElement("label", {
    htmlFor: "file"
  }, "File"), /* @__PURE__ */ React.createElement("input", {
    type: "file",
    id: "file",
    name: "file",
    accept: "application/pdf"
  }), /* @__PURE__ */ React.createElement("button", {
    type: "submit"
  }, "Submit")));
}

// route:/home/john/workspace/moneybox/socket.io/app/routes/products/$id.tsx
var id_exports = {};
__export(id_exports, {
  CatchBoundary: () => CatchBoundary,
  ErrorBoundary: () => ErrorBoundary,
  action: () => action2,
  loader: () => loader,
  meta: () => meta
});
var import_node2 = require("@remix-run/node");
var import_react8 = require("@remix-run/react");

// app/utils/db.server.ts
var import_client = require("@prisma/client");
var db;
if (true) {
  db = new import_client.PrismaClient();
} else {
  if (!global.__db) {
    global.__db = new import_client.PrismaClient();
  }
  db = global.__db;
}

// route:/home/john/workspace/moneybox/socket.io/app/routes/products/$id.tsx
var meta = ({
  data
}) => {
  if (!data) {
    return {
      title: "kein Ziel",
      description: "kein Ziel gefunden"
    };
  }
  return {
    title: `"${data.product.name}" `,
    description: `yeah ein neues Ziel: "${data.product.name}"`
  };
};
var loader = async ({ request, params }) => {
  let product = await db.product.findFirst({
    where: { id: parseInt(params.id) }
  });
  console.log(product);
  if (!product) {
    throw new Response("Not found.", { status: 404 });
  }
  let data = { product };
  return (0, import_node2.json)(data, {
    headers: {
      "Cache-Control": `public, max-age=${60 * 5}, s-maxage=${60 * 60 * 24}`,
      Vary: "Cookie"
    }
  });
};
var action2 = async ({ request, params }) => {
  const form = await request.formData();
  console.log(form);
  const product = await db.product.findUnique({
    where: { id: parseInt(params.id) }
  });
  console.log("PRODUKT TO DELETE", product);
  if (!product) {
    throw new Response("Man kann nicht l\xF6schen was nicht exestiert", {
      status: 404
    });
  }
  console.log(await db.product.delete({ where: { id: parseInt(params.id) } }));
  return (0, import_node2.redirect)("/");
};
function CatchBoundary() {
  const caught = (0, import_react8.useCatch)();
  const params = (0, import_react8.useParams)();
  switch (caught.status) {
    case 400: {
      return /* @__PURE__ */ React.createElement("div", {
        className: "error-container"
      }, "What you're trying to do is not allowed.");
    }
    case 404: {
      return /* @__PURE__ */ React.createElement("div", {
        className: "error-container"
      }, "Huh? What the heck is ", params.jokeId, "?");
    }
    case 401: {
      return /* @__PURE__ */ React.createElement("div", {
        className: "error-container"
      }, "Sorry, but ", params.jokeId, " is not your product.");
    }
    default: {
      throw new Error(`Unhandled error: ${caught.status}`);
    }
  }
}
function ErrorBoundary({ error }) {
  console.error(error);
  const { jokeId } = (0, import_react8.useParams)();
  return /* @__PURE__ */ React.createElement("div", {
    className: "error-container"
  }, "There was an error loading product by the id ", jokeId, ". Sorry.");
}

// route:/home/john/workspace/moneybox/socket.io/app/routes/products/new.tsx
var new_exports = {};
__export(new_exports, {
  CatchBoundary: () => CatchBoundary2,
  ErrorBoundary: () => ErrorBoundary2,
  action: () => action3,
  default: () => NewProductRoute,
  loader: () => loader2
});
var import_node3 = require("@remix-run/node");
var import_react9 = require("@remix-run/react");
var import_node4 = require("@remix-run/node");
var import_react10 = require("@chakra-ui/react");
var import_node5 = require("@remix-run/node");
var loader2 = async ({ request }) => {
  return (0, import_node3.json)({});
};
var regex = new RegExp("[0-9]+");
function validatePrice(price) {
  if (price.length < 1 || !regex.test(price)) {
    return `Bitte in cent als numerische Werte eingeben`;
  }
}
function validateName(name) {
  if (name.length < 2) {
    return `Der Name ist zu kurz.`;
  }
}
var badRequest = (data) => (0, import_node3.json)(data, { status: 400 });
var action3 = async ({ request }) => {
  const uploadHandler = (0, import_node5.unstable_composeUploadHandlers)((0, import_node4.unstable_createFileUploadHandler)({
    directory: "./public/uploads",
    file: ({ filename }) => filename
  }), (0, import_node5.unstable_createMemoryUploadHandler)());
  const formData = await (0, import_node4.unstable_parseMultipartFormData)(request, uploadHandler);
  const name = formData.get("name");
  const price = formData.get("price");
  const img = JSON.parse(JSON.stringify(formData.get("img"))).name || "";
  console.log(typeof name);
  console.log(typeof price);
  console.log();
  if (typeof name !== "string" || typeof price !== "string" || typeof img !== "string") {
    console.log("1");
    return badRequest({ formError: `Form not submitted correctly.` });
  }
  const fieldErrors = {
    name: validateName(name),
    price: validatePrice(price),
    img: false
  };
  console.log("2");
  const fields = { name, price, img };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }
  console.log("3");
  const product = await db.product.create({
    data: __spreadValues({}, fields)
  });
  console.log("4");
  return (0, import_node3.redirect)(`/`);
};
function NewProductRoute() {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const actionData = (0, import_react9.useActionData)();
  const transition = (0, import_react9.useTransition)();
  if (transition.submission) {
    const name = transition.submission.formData.get("name");
    const price = transition.submission.formData.get("price");
    if (typeof name === "string" && typeof price === "string" && !validatePrice(price) && !validateName(name)) {
      return /* @__PURE__ */ React.createElement("div", null);
    }
  }
  return /* @__PURE__ */ React.createElement(import_react10.Center, null, /* @__PURE__ */ React.createElement(import_react10.Box, {
    border: "1px",
    padding: 5,
    margin: 5,
    width: 600
  }, /* @__PURE__ */ React.createElement(import_react10.Text, {
    fontSize: "xl"
  }, " Ein neues Ziel hinzuf\xFCgen"), /* @__PURE__ */ React.createElement(import_react9.Form, {
    method: "post",
    encType: "multipart/form-data"
  }, /* @__PURE__ */ React.createElement(import_react10.Box, {
    padding: 1
  }, /* @__PURE__ */ React.createElement(import_react10.Text, null, "Name: "), /* @__PURE__ */ React.createElement(import_react10.Input, {
    placeholder: "z.B. Schuhe",
    type: "text",
    defaultValue: (_a = actionData == null ? void 0 : actionData.fields) == null ? void 0 : _a.name,
    name: "name",
    "aria-invalid": Boolean((_b = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _b.name),
    "aria-errormessage": ((_c = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _c.name) ? "name-error" : void 0
  }), ((_d = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _d.name) ? /* @__PURE__ */ React.createElement("p", {
    className: "form-validation-error",
    role: "alert",
    id: "name-error"
  }, /* @__PURE__ */ React.createElement(import_react10.Text, {
    color: "red.400"
  }, actionData.fieldErrors.name)) : null), /* @__PURE__ */ React.createElement(import_react10.Box, {
    padding: 1
  }, /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement(import_react10.Text, null, "Preis in Cent: "), /* @__PURE__ */ React.createElement(import_react10.Input, {
    placeholder: "2000",
    defaultValue: (_e = actionData == null ? void 0 : actionData.fields) == null ? void 0 : _e.price,
    name: "price",
    "aria-invalid": Boolean((_f = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _f.price),
    "aria-errormessage": ((_g = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _g.price) ? "price-error" : void 0
  })), ((_h = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _h.price) ? /* @__PURE__ */ React.createElement("p", {
    className: "form-validation-error",
    role: "alert",
    id: "price-error"
  }, /* @__PURE__ */ React.createElement(import_react10.Text, {
    color: "red.400"
  }, " ", actionData.fieldErrors.price, " ")) : null), /* @__PURE__ */ React.createElement(import_react10.Box, {
    padding: 1
  }, "Bild hinzuf\xFCgen (max 2.5MB)", /* @__PURE__ */ React.createElement(import_react10.Input, {
    type: "file",
    id: "img",
    name: "img",
    accept: "image/*"
  })), /* @__PURE__ */ React.createElement(import_react10.Box, {
    padding: 1
  }, (actionData == null ? void 0 : actionData.formError) ? /* @__PURE__ */ React.createElement("p", {
    className: "form-validation-error",
    role: "alert"
  }, /* @__PURE__ */ React.createElement(import_react10.Text, {
    color: "red.400"
  }, actionData.formError)) : null, /* @__PURE__ */ React.createElement(import_react10.Button, {
    type: "submit",
    className: "button"
  }, "Hinzuf\xFCgen")))));
}
function CatchBoundary2() {
  const caught = (0, import_react9.useCatch)();
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
function ErrorBoundary2({ error }) {
  console.error(error);
  return /* @__PURE__ */ React.createElement("div", null, "Sorry about that.");
}

// route:/home/john/workspace/moneybox/socket.io/app/routes/fetchMoney.tsx
var fetchMoney_exports = {};
__export(fetchMoney_exports, {
  loader: () => loader3
});
var import_node6 = require("@remix-run/node");
var import_fs_extra = __toESM(require("fs-extra"));
async function loader3() {
  const data = {
    productItems: [
      {
        id: "0",
        title: "test",
        price: "0",
        image: "/1.jpg"
      }
    ],
    money: parseInt(import_fs_extra.default.readFileSync("public/money.txt", "utf8"))
  };
  return (0, import_node6.json)(data);
}

// route:/home/john/workspace/moneybox/socket.io/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  action: () => action4,
  default: () => Index2,
  loader: () => loader4
});
var import_node7 = require("@remix-run/node");
var import_react11 = require("react");
var import_react12 = require("@remix-run/react");
var import_react13 = require("@chakra-ui/react");
var import_fs_extra2 = __toESM(require("fs-extra"));
var import_react14 = require("@chakra-ui/react");
var loader4 = async ({ request, params }) => {
  const products = await db.product.findMany();
  const data = {
    productItems: products,
    money: parseInt(import_fs_extra2.default.readFileSync("public/money.txt", "utf8"))
  };
  return (0, import_node7.json)(data);
};
var action4 = async ({ request, params }) => {
  const form = await request.formData();
  const deleteId = parseInt(String(form.get("delete")));
  const product = await db.product.findUnique({
    where: { id: deleteId }
  });
  console.log(product);
  import_fs_extra2.default.removeSync(`public/uploads/${product == null ? void 0 : product.img}`);
  await db.product.delete({ where: { id: deleteId } });
  if (!product) {
    throw new Response("Man kann nicht l\xF6schen was nicht exestiert", {
      status: 404
    });
  }
  return (0, import_node7.redirect)("/");
};
function Index2() {
  const data = (0, import_react12.useLoaderData)();
  const [money, setMoney] = (0, import_react11.useState)(data.money);
  const fetcher = (0, import_react12.useFetcher)();
  if (data.money === null || data.money === void 0 || data.money === 0) {
    setMoney(0);
  }
  const socket = useSocket();
  (0, import_react11.useEffect)(() => {
    if (!socket)
      return;
    socket.on("event", (data2) => {
      fetcher.load("/fetchMoney");
    });
    socket.emit("event", "ping");
  }, [socket, fetcher]);
  (0, import_react11.useEffect)(() => {
    if (!fetcher.data)
      return;
    setMoney(fetcher.data.money);
  });
  return /* @__PURE__ */ React.createElement(import_react13.Container, null, /* @__PURE__ */ React.createElement(import_react13.VStack, null, /* @__PURE__ */ React.createElement(import_react13.VStack, {
    width: "650px",
    bg: "purple.300"
  }, /* @__PURE__ */ React.createElement(import_react13.Box, {
    width: "100px"
  }, /* @__PURE__ */ React.createElement("img", {
    src: "/pig.png"
  })), /* @__PURE__ */ React.createElement(import_react13.Box, null, /* @__PURE__ */ React.createElement(import_react13.Text, {
    fontSize: "3xl"
  }, "Du hast ", /* @__PURE__ */ React.createElement("b", null, money / 100, "\u20AC"), " gespart."))), data.productItems.map((item, i) => {
    const price = parseInt(item.price);
    const missing = (parseInt(item.price) - money) / 100;
    let progressvalue = money * 100 / price;
    let colorScheme = "red";
    if (progressvalue == price)
      progressvalue = price;
    if (progressvalue < 99)
      colorScheme = "orange";
    if (progressvalue >= 100)
      colorScheme = "green";
    if (missing > 0) {
      return /* @__PURE__ */ React.createElement(import_react13.VStack, {
        width: "650px",
        bg: "gray.400"
      }, /* @__PURE__ */ React.createElement(import_react14.HStack, null, /* @__PURE__ */ React.createElement(import_react13.Box, null, /* @__PURE__ */ React.createElement(import_react13.Text, {
        fontSize: "lg"
      }, "Es fehlen noch ", /* @__PURE__ */ React.createElement("b", null, missing, " \u20AC"), " f\xFCr ", /* @__PURE__ */ React.createElement("b", null, item.name)), /* @__PURE__ */ React.createElement(import_react13.Progress, {
        value: money * 100 / parseInt(item.price),
        colorScheme,
        width: "300px"
      })), /* @__PURE__ */ React.createElement(import_react13.Box, {
        width: "50px",
        paddingTop: "20px"
      }, parseInt(item.price) / 100, " \u20AC"), /* @__PURE__ */ React.createElement(import_react13.Image, {
        boxSize: "150px",
        objectFit: "cover",
        src: `uploads/${item.img}`,
        alt: "Produktbild"
      }), /* @__PURE__ */ React.createElement(import_react12.Form, {
        method: "delete"
      }, /* @__PURE__ */ React.createElement(import_react13.Button, {
        name: "delete",
        type: "submit",
        className: "button",
        value: item.id
      }, "L\xF6schen"))));
    } else {
      return /* @__PURE__ */ React.createElement(import_react13.VStack, {
        width: "650px",
        bg: "gray.400"
      }, /* @__PURE__ */ React.createElement(import_react14.HStack, null, /* @__PURE__ */ React.createElement(import_react13.Box, null, /* @__PURE__ */ React.createElement(import_react13.Text, {
        fontSize: "lg"
      }, "Du kannst dir ", /* @__PURE__ */ React.createElement("b", null, item.name, " kaufen")), /* @__PURE__ */ React.createElement(import_react13.Progress, {
        value: money * 100 / parseInt(item.price),
        colorScheme,
        width: "300px"
      })), /* @__PURE__ */ React.createElement(import_react13.Box, {
        width: "50px",
        paddingTop: "20px"
      }, parseInt(item.price) / 100, " \u20AC"), /* @__PURE__ */ React.createElement(import_react13.Image, {
        boxSize: "150px",
        objectFit: "cover",
        src: `uploads/${item.img}`,
        alt: "Produktbild"
      }), /* @__PURE__ */ React.createElement(import_react12.Form, {
        method: "delete"
      }, /* @__PURE__ */ React.createElement(import_react13.Button, {
        name: "delete",
        type: "submit",
        className: "button",
        value: item.id
      }, "L\xF6schen"))));
    }
  }), /* @__PURE__ */ React.createElement(import_react13.Button, null, /* @__PURE__ */ React.createElement(import_react12.Link, {
    to: "products/new"
  }, "Neues Ziel Hinzuf\xFCgen"))));
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { "version": "1f8a7a34", "entry": { "module": "/build/entry.client-YWLP4ZPI.js", "imports": ["/build/_shared/chunk-MFAXCCHX.js", "/build/_shared/chunk-K2N6UOBS.js", "/build/_shared/chunk-7UK5LOUV.js", "/build/_shared/chunk-OCA52GWZ.js"] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "module": "/build/root-V4JPNLIX.js", "imports": ["/build/_shared/chunk-GD7KQGLH.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/fetchMoney": { "id": "routes/fetchMoney", "parentId": "root", "path": "fetchMoney", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/fetchMoney-OVHJ2PCJ.js", "imports": void 0, "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/index": { "id": "routes/index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/index-XN4AQKQP.js", "imports": ["/build/_shared/chunk-UVX52VVJ.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/products/$id": { "id": "routes/products/$id", "parentId": "root", "path": "products/:id", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/products/$id-3WALS6GE.js", "imports": ["/build/_shared/chunk-UVX52VVJ.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": true, "hasErrorBoundary": true }, "routes/products/new": { "id": "routes/products/new", "parentId": "root", "path": "products/new", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/products/new-JG5HWNAL.js", "imports": ["/build/_shared/chunk-UVX52VVJ.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": true, "hasErrorBoundary": true }, "routes/products/upload": { "id": "routes/products/upload", "parentId": "root", "path": "products/upload", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/products/upload-GQB7JHMP.js", "imports": void 0, "hasAction": true, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false } }, "url": "/build/manifest-1F8A7A34.js" };

// server-entry-module:@remix-run/dev/server-build
var entry = { module: entry_server_exports };
var routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/products/upload": {
    id: "routes/products/upload",
    parentId: "root",
    path: "products/upload",
    index: void 0,
    caseSensitive: void 0,
    module: upload_exports
  },
  "routes/products/$id": {
    id: "routes/products/$id",
    parentId: "root",
    path: "products/:id",
    index: void 0,
    caseSensitive: void 0,
    module: id_exports
  },
  "routes/products/new": {
    id: "routes/products/new",
    parentId: "root",
    path: "products/new",
    index: void 0,
    caseSensitive: void 0,
    module: new_exports
  },
  "routes/fetchMoney": {
    id: "routes/fetchMoney",
    parentId: "root",
    path: "fetchMoney",
    index: void 0,
    caseSensitive: void 0,
    module: fetchMoney_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: routes_exports
  }
};
module.exports = __toCommonJS(stdin_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  entry,
  routes
});
