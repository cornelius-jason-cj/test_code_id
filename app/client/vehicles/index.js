import { Router } from 'express';
import {
  createVehicle,
  getAllVehicle,
  getDetailVehicle,
  updateVehicle,
  deleteVehicle
} from './controller.js';

const router = Router();

router.post('/vehicle', createVehicle);
router.get('/vehicle', getAllVehicle);
router.get('/vehicle/vehicle_id', getDetailVehicle);
router.put('/vehicle/vehicle_id', updateVehicle);
router.delete('/vehicle/vehicle_id', deleteVehicle);

export default router;
