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

// route:/home/john/workspace/moneybox/socket.io/app/routes/fetchMoney.tsx
var fetchMoney_exports = {};
__export(fetchMoney_exports, {
  loader: () => loader
});
var import_node = require("@remix-run/node");
var import_fs_extra = __toESM(require("fs-extra"));
async function loader() {
  const data = {
    productItems: [
      {
        id: "0",
        title: "test",
        price: "0",
        image: "/1.jpg"
      }
    ],
    money: parseInt(import_fs_extra.default.readFileSync("/home/john/workspace/moneybox/socket.io/money.txt", "utf8"))
  };
  return (0, import_node.json)(data);
}

// route:/home/john/workspace/moneybox/socket.io/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index,
  loader: () => loader2
});
var import_node2 = require("@remix-run/node");
var import_react7 = require("react");
var import_react8 = require("@remix-run/react");
var import_react9 = require("@chakra-ui/react");
var import_fs_extra2 = __toESM(require("fs-extra"));
var import_react10 = require("@chakra-ui/react");
async function loader2() {
  const data = {
    productItems: [
      {
        id: "0",
        title: "test",
        price: "0",
        image: "/1.jpg"
      }
    ],
    money: parseInt(import_fs_extra2.default.readFileSync("/home/john/workspace/moneybox/socket.io/money.txt", "utf8"))
  };
  return (0, import_node2.json)(data);
}
function Index() {
  var _a;
  const data = (0, import_react8.useLoaderData)();
  const [money, setMoney] = (0, import_react7.useState)(data.money);
  const fetcher = (0, import_react8.useFetcher)();
  if (data.money === null || data.money === void 0 || data.money === 0) {
    setMoney(0);
  }
  const socket = useSocket();
  (0, import_react7.useEffect)(() => {
    if (!socket)
      return;
    socket.on("event", (data2) => {
      fetcher.load("/fetchMoney");
    });
    socket.emit("event", "ping");
  }, [socket, fetcher]);
  (0, import_react7.useEffect)(() => {
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
  return /* @__PURE__ */ React.createElement(import_react9.Container, null, /* @__PURE__ */ React.createElement(import_react9.VStack, null, /* @__PURE__ */ React.createElement(import_react9.VStack, {
    width: "600px",
    bg: "purple.300"
  }, /* @__PURE__ */ React.createElement(import_react9.Box, {
    width: "100px"
  }, /* @__PURE__ */ React.createElement("img", {
    src: "/pig.png"
  })), /* @__PURE__ */ React.createElement(import_react9.Box, null, /* @__PURE__ */ React.createElement(import_react9.Text, {
    fontSize: "3xl"
  }, "Du hast ", /* @__PURE__ */ React.createElement("b", null, money / 100, "\u20AC"), " gespart.", console.log(money)))), /* @__PURE__ */ React.createElement(import_react9.VStack, {
    width: "600px",
    bg: "gray.400"
  }, /* @__PURE__ */ React.createElement(import_react10.HStack, null, /* @__PURE__ */ React.createElement(import_react9.Box, null, /* @__PURE__ */ React.createElement(import_react10.HStack, null, /* @__PURE__ */ React.createElement(import_react9.Box, null, "Es fehlen noch ", /* @__PURE__ */ React.createElement("b", null, missingValue, " \u20AC"), " f\xFCr Schuhe.", /* @__PURE__ */ React.createElement(import_react9.Progress, {
    value: progressvalue,
    colorScheme
  })), /* @__PURE__ */ React.createElement(import_react9.Box, {
    paddingTop: "20px"
  }, /* @__PURE__ */ React.createElement(import_react9.Text, {
    fontSize: "lg"
  }, price / 100, " \u20AC")))), /* @__PURE__ */ React.createElement(import_react9.Box, {
    width: "100px"
  }, /* @__PURE__ */ React.createElement("img", {
    src: "/schuhe.jpg"
  }))))));
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { "version": "129b4fda", "entry": { "module": "/build/entry.client-FUNU632Q.js", "imports": ["/build/_shared/chunk-27Y5DZB7.js", "/build/_shared/chunk-OCA52GWZ.js"] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "module": "/build/root-AD5E3VPO.js", "imports": ["/build/_shared/chunk-2VEVG6BH.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/fetchMoney": { "id": "routes/fetchMoney", "parentId": "root", "path": "fetchMoney", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/fetchMoney-OVHJ2PCJ.js", "imports": void 0, "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/index": { "id": "routes/index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/index-PATN7JWU.js", "imports": void 0, "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false } }, "url": "/build/manifest-129B4FDA.js" };

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
