const express = require('express');
const router = express.Router();

const OrganizationController = require('../controller/organization.controller');

router.post('/organization', OrganizationController.AddOrganization);
router.get('/organizations', OrganizationController.GetAllOrganization);
router.get('/organization/:organization_id', OrganizationController.GetSingleOrganization);
router.put('/organization/:organization_id', OrganizationController.UpdateOrganization);
router.delete('/organization/:organization_id', OrganizationController.DeleteOrganization);

module.exports = router;