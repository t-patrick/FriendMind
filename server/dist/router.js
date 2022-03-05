var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express');
const router = express.Router();
const upload = require('./image-config');
router.get('/image', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const friend = yield test.getFriend(req.query.id);
    res.sendFile(path.join(__dirname, '/imagestore/', friend.profilePictureUrl));
}));
/*
TODO
Add to database.
*/
router.post('/sendimage', upload.single('image'), (req, res) => {
    res.send(req.file);
});
module.exports = router;
//# sourceMappingURL=router.js.map