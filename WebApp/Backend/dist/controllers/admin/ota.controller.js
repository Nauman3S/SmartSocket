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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileToS3 = void 0;
// import { Ota } from "../../models";
// import { IOta } from "../../types/types";
// import { uploadFile } from "../../libraries/multer";
/**
 * Upload File
 * @param {Request} req
 * @param {Request} req
 */
const uploadFileToS3 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.file);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.uploadFileToS3 = uploadFileToS3;
