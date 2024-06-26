const express = require("express");
const router = express.Router();
const searchController = require('../controllers/searchController')

router.get("/jobpost", searchController.searchJobPost);
router.get("/companies",searchController.searchCompanies);
router.get("/people", searchController.searchPeople)

module.exports = router;
