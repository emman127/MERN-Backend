const express = require('express');
const router = express.Router();

const OrganizationController = require('../controller/organization.controller');
const { isAuthenticated } = require('../utils/middleware');

router.post('/organization', isAuthenticated, OrganizationController.AddOrganization);
router.get('/organizations', isAuthenticated, OrganizationController.GetAllOrganization);
router.get('/organization/:organization_id', isAuthenticated, OrganizationController.GetSingleOrganization);
router.put('/organization/:organization_id', isAuthenticated, OrganizationController.UpdateOrganization);
router.delete('/organization/:organization_id', isAuthenticated, OrganizationController.DeleteOrganization);

module.exports = router;