"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const genai_1 = require("@google/genai");
const options = {
    apiKey: process.env.GOOGLE_GENAI_API_KEY
};
const ai = new genai_1.GoogleGenAI(options);
const params = {
    model: "gemini-2.5-pro",
    contents: [
        {
            role: 'user',
            parts: [
                {
                    text: ""
                },
            ],
        },
    ]
};
const stream = ai.models.generateContentStream(params);
stream.then((response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, response_1, response_1_1;
    var _b, e_1, _c, _d;
    try {
        for (_a = true, response_1 = __asyncValues(response); response_1_1 = yield response_1.next(), _b = response_1_1.done, !_b; _a = true) {
            _d = response_1_1.value;
            _a = false;
            const chunk = _d;
            console.log(chunk.text);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_a && !_b && (_c = response_1.return)) yield _c.call(response_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
}));
