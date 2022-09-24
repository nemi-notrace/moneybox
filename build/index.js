var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// route:/home/john/workspace/moneybox/moneybox/app/root.tsx
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

// route:/home/john/workspace/moneybox/moneybox/app/routes/product/index.tsx
var product_exports = {};
__export(product_exports, {
  CatchBoundary: () => CatchBoundary,
  ErrorBoundary: () => ErrorBoundary,
  default: () => JokesIndexRoute,
  loader: () => loader
});
var import_node = require("@remix-run/node");
var import_react7 = require("@remix-run/react");
var loader = async ({ request }) => {
  const data = "";
  return (0, import_node.json)(data);
};
function JokesIndexRoute() {
  const data = (0, import_react7.useLoaderData)();
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", null, "Here's a random joke:"), /* @__PURE__ */ React.createElement("p", null, data.randomJoke.content), /* @__PURE__ */ React.createElement(import_react7.Link, {
    to: data.randomJoke.id
  }, '"', data.randomJoke.name, '" Permalink'));
}
function CatchBoundary() {
  const caught = (0, import_react7.useCatch)();
  if (caught.status === 404) {
    return /* @__PURE__ */ React.createElement("div", {
      className: "error-container"
    }, /* @__PURE__ */ React.createElement("p", null, "There are no jokes to display.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("small", null, "Note: this is the deployed version of the jokes app example and because we don't want to show you unmoderated content, we only display jokes you create in this version.")), /* @__PURE__ */ React.createElement(import_react7.Link, {
      to: "new"
    }, "Add your own"));
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
function ErrorBoundary({ error }) {
  console.error(error);
  return /* @__PURE__ */ React.createElement("div", null, "I did a whoopsies.");
}

// route:/home/john/workspace/moneybox/moneybox/app/routes/product/$uid.tsx
var uid_exports = {};
__export(uid_exports, {
  CatchBoundary: () => CatchBoundary2,
  ErrorBoundary: () => ErrorBoundary2,
  action: () => action,
  default: () => JokeRoute,
  loader: () => loader2
});
var import_node2 = require("@remix-run/node");
var import_react8 = require("@remix-run/react");
var loader2 = async ({ request, params }) => {
  const data = {};
  return (0, import_node2.json)(data);
};
var action = async ({ request, params }) => {
  const form = await request.formData();
  if (form.get("_method") !== "delete") {
    throw new Response(`The _method ${form.get("_method")} is not supported`, {
      status: 400
    });
  }
  return (0, import_node2.redirect)("/jokes");
};
function JokeRoute() {
  const data = (0, import_react8.useLoaderData)();
}
function CatchBoundary2() {
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
      }, "Sorry, but ", params.jokeId, " is not your joke.");
    }
    default: {
      throw new Error(`Unhandled error: ${caught.status}`);
    }
  }
}
function ErrorBoundary2({ error }) {
  console.error(error);
  const { jokeId } = (0, import_react8.useParams)();
  return /* @__PURE__ */ React.createElement("div", {
    className: "error-container"
  }, "There was an error loading joke by the id ", jokeId, ". Sorry.");
}

// route:/home/john/workspace/moneybox/moneybox/app/routes/product/new.tsx
var new_exports = {};
__export(new_exports, {
  CatchBoundary: () => CatchBoundary3,
  ErrorBoundary: () => ErrorBoundary3,
  action: () => action2,
  default: () => NewJokeRoute,
  loader: () => loader3
});
var import_node3 = require("@remix-run/node");
var import_react9 = require("@remix-run/react");
var loader3 = async ({ request }) => {
  return (0, import_node3.json)({});
};
function validateJokeContent(content) {
  if (content.length < 10) {
    return `That joke is too short`;
  }
}
function validateJokeName(name) {
  if (name.length < 2) {
    return `That joke's name is too short`;
  }
}
var badRequest = (data) => (0, import_node3.json)(data, { status: 400 });
var action2 = async ({ request }) => {
  const form = await request.formData();
  const name = form.get("name");
  const content = form.get("content");
  if (typeof name !== "string" || typeof content !== "string") {
    return badRequest({ formError: `Form not submitted correctly.` });
  }
  const fieldErrors = {
    name: validateJokeName(name),
    content: validateJokeContent(content)
  };
  const fields = { name, content };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }
};
function NewJokeRoute() {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const actionData = (0, import_react9.useActionData)();
  const transition = (0, import_react9.useTransition)();
  if (transition.submission) {
    const name = transition.submission.formData.get("name");
    const content = transition.submission.formData.get("content");
    if (typeof name === "string" && typeof content === "string" && !validateJokeContent(content) && !validateJokeName(name)) {
      return /* @__PURE__ */ React.createElement("div", null, "Hi");
    }
  }
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", null, "Add your own hilarious joke"), /* @__PURE__ */ React.createElement(import_react9.Form, {
    method: "post"
  }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", null, "Name:", " ", /* @__PURE__ */ React.createElement("input", {
    type: "text",
    defaultValue: (_a = actionData == null ? void 0 : actionData.fields) == null ? void 0 : _a.name,
    name: "name",
    "aria-invalid": Boolean((_b = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _b.name),
    "aria-errormessage": ((_c = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _c.name) ? "name-error" : void 0
  })), ((_d = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _d.name) ? /* @__PURE__ */ React.createElement("p", {
    className: "form-validation-error",
    role: "alert",
    id: "name-error"
  }, actionData.fieldErrors.name) : null), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", null, "Content:", " ", /* @__PURE__ */ React.createElement("textarea", {
    defaultValue: (_e = actionData == null ? void 0 : actionData.fields) == null ? void 0 : _e.content,
    name: "content",
    "aria-invalid": Boolean((_f = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _f.content),
    "aria-errormessage": ((_g = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _g.content) ? "content-error" : void 0
  })), ((_h = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _h.content) ? /* @__PURE__ */ React.createElement("p", {
    className: "form-validation-error",
    role: "alert",
    id: "content-error"
  }, actionData.fieldErrors.content) : null), /* @__PURE__ */ React.createElement("div", null, (actionData == null ? void 0 : actionData.formError) ? /* @__PURE__ */ React.createElement("p", {
    className: "form-validation-error",
    role: "alert"
  }, actionData.formError) : null, /* @__PURE__ */ React.createElement("button", {
    type: "submit",
    className: "button"
  }, "Add"))));
}
function CatchBoundary3() {
  const caught = (0, import_react9.useCatch)();
  if (caught.status === 401) {
    return /* @__PURE__ */ React.createElement("div", {
      className: "error-container"
    }, /* @__PURE__ */ React.createElement("p", null, "You must be logged in to create a joke."), /* @__PURE__ */ React.createElement(import_react9.Link, {
      to: "/login?redirectTo=/jokes/new"
    }, "Login"));
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
function ErrorBoundary3({ error }) {
  console.error(error);
  return /* @__PURE__ */ React.createElement("div", null, "Something unexpected went wrong. Sorry about that.");
}

// route:/home/john/workspace/moneybox/moneybox/app/routes/fetchMoney.tsx
var fetchMoney_exports = {};
__export(fetchMoney_exports, {
  loader: () => loader4
});
var import_node4 = require("@remix-run/node");
var import_fs_extra = __toESM(require("fs-extra"));
async function loader4() {
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
  return (0, import_node4.json)(data);
}

// route:/home/john/workspace/moneybox/moneybox/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index,
  loader: () => loader5
});
var import_node5 = require("@remix-run/node");
var import_react10 = require("react");
var import_react11 = require("@remix-run/react");
var import_react12 = require("@chakra-ui/react");
var import_fs_extra2 = __toESM(require("fs-extra"));
var import_react13 = require("@chakra-ui/react");
async function loader5() {
  const data = {
    productItems: [
      {
        id: "0",
        title: "test",
        price: "0",
        image: "/1.jpg"
      }
    ],
    money: parseInt(import_fs_extra2.default.readFileSync("public/money.txt", "utf8"))
  };
  return (0, import_node5.json)(data);
}
function Index() {
  var _a;
  const data = (0, import_react11.useLoaderData)();
  const [money, setMoney] = (0, import_react10.useState)(data.money);
  const fetcher = (0, import_react11.useFetcher)();
  if (data.money === null || data.money === void 0 || data.money === 0) {
    setMoney(0);
  }
  const socket = useSocket();
  (0, import_react10.useEffect)(() => {
    if (!socket)
      return;
    socket.on("event", (data2) => {
      fetcher.load("/fetchMoney");
    });
    socket.emit("event", "ping");
  }, [socket, fetcher]);
  (0, import_react10.useEffect)(() => {
    if (!fetcher.data)
      return;
    setMoney(fetcher.data.money);
  });
  console.log((_a = fetcher.data) == null ? void 0 : _a.money);
  let price = 2e3;
  let progressvalue = money * 100 / price;
  let missingValue = (price - money) / 100;
  if (price < money)
    missingValue = 0;
  let colorScheme = "red";
  if (progressvalue == price)
    progressvalue = price;
  if (progressvalue < 99)
    colorScheme = "orange";
  if (progressvalue >= 100)
    colorScheme = "green";
  return /* @__PURE__ */ React.createElement(import_react12.Container, null, /* @__PURE__ */ React.createElement(import_react12.VStack, null, /* @__PURE__ */ React.createElement(import_react12.VStack, {
    width: "600px",
    bg: "purple.300"
  }, /* @__PURE__ */ React.createElement(import_react12.Box, {
    width: "100px"
  }, /* @__PURE__ */ React.createElement("img", {
    src: "/pig.png"
  })), /* @__PURE__ */ React.createElement(import_react12.Box, null, /* @__PURE__ */ React.createElement(import_react12.Text, {
    fontSize: "3xl"
  }, "Du hast ", /* @__PURE__ */ React.createElement("b", null, money / 100, "\u20AC"), " gespart.", console.log(money)))), /* @__PURE__ */ React.createElement(import_react12.VStack, {
    width: "600px",
    bg: "gray.400"
  }, /* @__PURE__ */ React.createElement(import_react13.HStack, null, /* @__PURE__ */ React.createElement(import_react12.Box, null, /* @__PURE__ */ React.createElement(import_react13.HStack, null, /* @__PURE__ */ React.createElement(import_react12.Box, null, "Es fehlen noch ", /* @__PURE__ */ React.createElement("b", null, missingValue, " \u20AC"), " f\xFCr Schuhe.", /* @__PURE__ */ React.createElement(import_react12.Progress, {
    value: progressvalue,
    colorScheme
  })), /* @__PURE__ */ React.createElement(import_react12.Box, {
    paddingTop: "20px"
  }, /* @__PURE__ */ React.createElement(import_react12.Text, {
    fontSize: "lg"
  }, price / 100, " \u20AC")))), /* @__PURE__ */ React.createElement(import_react12.Box, {
    width: "100px"
  }, /* @__PURE__ */ React.createElement("img", {
    src: "/schuhe.jpg"
  })), /* @__PURE__ */ React.createElement("div", {
    className: "jokes-outlet"
  }, /* @__PURE__ */ React.createElement(import_react11.Outlet, null))))));
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { "version": "d6d1b19c", "entry": { "module": "/build/entry.client-AKU3T2ZP.js", "imports": ["/build/_shared/chunk-7TQWREO2.js", "/build/_shared/chunk-7UK5LOUV.js", "/build/_shared/chunk-OCA52GWZ.js"] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "module": "/build/root-LJLVX3BN.js", "imports": ["/build/_shared/chunk-KPLAA3UI.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/fetchMoney": { "id": "routes/fetchMoney", "parentId": "root", "path": "fetchMoney", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/fetchMoney-HCIHKWE4.js", "imports": void 0, "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/index": { "id": "routes/index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/index-RMT52YYG.js", "imports": void 0, "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/product/$uid": { "id": "routes/product/$uid", "parentId": "root", "path": "product/:uid", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/product/$uid-4OGHAZNQ.js", "imports": void 0, "hasAction": true, "hasLoader": true, "hasCatchBoundary": true, "hasErrorBoundary": true }, "routes/product/index": { "id": "routes/product/index", "parentId": "root", "path": "product", "index": true, "caseSensitive": void 0, "module": "/build/routes/product/index-NQ526XZQ.js", "imports": void 0, "hasAction": false, "hasLoader": true, "hasCatchBoundary": true, "hasErrorBoundary": true }, "routes/product/new": { "id": "routes/product/new", "parentId": "root", "path": "product/new", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/product/new-JDX3MXB6.js", "imports": void 0, "hasAction": true, "hasLoader": true, "hasCatchBoundary": true, "hasErrorBoundary": true } }, "url": "/build/manifest-D6D1B19C.js" };

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
  "routes/product/index": {
    id: "routes/product/index",
    parentId: "root",
    path: "product",
    index: true,
    caseSensitive: void 0,
    module: product_exports
  },
  "routes/product/$uid": {
    id: "routes/product/$uid",
    parentId: "root",
    path: "product/:uid",
    index: void 0,
    caseSensitive: void 0,
    module: uid_exports
  },
  "routes/product/new": {
    id: "routes/product/new",
    parentId: "root",
    path: "product/new",
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
