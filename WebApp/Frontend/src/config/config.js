import Swal from "sweetalert2";
import { createAppointment } from "../api/apiFunctions";

export const formattedDate = (d = new Date()) => {
  d = new Date(d);
  return [d.getDate(), d.getMonth() + 1, d.getFullYear()]
    .map((n) => (n < 10 ? `0${n}` : `${n}`))
    .join("-");
};

export const makePatientData = (selectedPatient) => {
  return {
    firstName: selectedPatient?.firstName,
    lastName: selectedPatient?.lastName,
    disabled: selectedPatient?.disabled,
    phoneNumber: selectedPatient?.phoneNumber,
    dateOfBirth: selectedPatient?.dateOfBirth,
    dateOfEntry: selectedPatient?.dateOfEntry,
    caseType: selectedPatient.caseType || "Normal",
    attorney: selectedPatient.attorney,
    patientId: selectedPatient.patientId,
    transportation: selectedPatient.transportation,
    x_ray: selectedPatient.x_ray,
    officialVisits: selectedPatient.officialVisits,
    discharged: selectedPatient?.discharged || false,
    nonCompliant: selectedPatient.nonCompliant || false,
  };
};

export const submitAppointment = async (e, patient, data) => {
  e.preventDefault();
  if (!patient._id || patient._id.length !== 24) {
    return Swal.fire({
      timer: 2000,
      icon: "info",
      text: "Please select a patient ",
    });
  }
  try {
    await createAppointment(data);
    return Swal.fire({
      timer: 1000,
      icon: "success",
      showConfirmButton: false,
      text: "Added Appointment",
    });
  } catch (e) {
    Swal.fire({
      icon: "error",
      text: `${e.response.data?.message || "Server Responded with Status 500"}`,
    });
  }
};
