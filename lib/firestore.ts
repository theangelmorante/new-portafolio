import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import {
  Project,
  Experience,
  Certification,
  Education,
  Skill,
  PersonalInfo,
} from "@/types";

/** Removes undefined values from an object. Firestore does not accept undefined. */
function removeUndefined<T extends Record<string, unknown>>(
  obj: T
): { [k: string]: T[keyof T] } {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  ) as { [k: string]: T[keyof T] };
}

// Projects
export async function getProjects(): Promise<Project[]> {
  try {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as Project[];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function addProject(
  project: Omit<Project, "id">,
): Promise<string> {
  const data = removeUndefined({
    ...project,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  const docRef = await addDoc(collection(db, "projects"), data);
  return docRef.id;
}

export async function updateProject(
  id: string,
  project: Partial<Project>,
): Promise<void> {
  const data = removeUndefined({
    ...project,
    updatedAt: Timestamp.now(),
  });
  await updateDoc(doc(db, "projects", id), data);
}

export async function deleteProject(id: string): Promise<void> {
  await deleteDoc(doc(db, "projects", id));
}

// Experiences
export async function getExperiences(): Promise<Experience[]> {
  try {
    const q = query(
      collection(db, "experiences"),
      orderBy("startDate", "desc"),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as Experience[];
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }
}

export async function addExperience(
  experience: Omit<Experience, "id">,
): Promise<string> {
  const data = removeUndefined({
    ...experience,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  const docRef = await addDoc(collection(db, "experiences"), data);
  return docRef.id;
}

export async function updateExperience(
  id: string,
  experience: Partial<Experience>,
): Promise<void> {
  const data = removeUndefined({
    ...experience,
    updatedAt: Timestamp.now(),
  });
  await updateDoc(doc(db, "experiences", id), data);
}

export async function deleteExperience(id: string): Promise<void> {
  await deleteDoc(doc(db, "experiences", id));
}

// Certifications
export async function getCertifications(): Promise<Certification[]> {
  try {
    const q = query(
      collection(db, "certifications"),
      orderBy("issueDate", "desc"),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      issueDate: doc.data().issueDate,
      expiryDate: doc.data().expiryDate,
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as Certification[];
  } catch (error) {
    console.error("Error fetching certifications:", error);
    return [];
  }
}

export async function addCertification(
  certification: Omit<Certification, "id">,
): Promise<string> {
  const data = removeUndefined({
    ...certification,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  const docRef = await addDoc(collection(db, "certifications"), data);
  return docRef.id;
}

export async function updateCertification(
  id: string,
  certification: Partial<Certification>,
): Promise<void> {
  const data = removeUndefined({
    ...certification,
    updatedAt: Timestamp.now(),
  });
  await updateDoc(doc(db, "certifications", id), data);
}

export async function deleteCertification(id: string): Promise<void> {
  await deleteDoc(doc(db, "certifications", id));
}

// Education
export async function getEducation(): Promise<Education[]> {
  try {
    const q = query(collection(db, "education"), orderBy("startDate", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      startDate: doc.data().startDate,
      endDate: doc.data().endDate,
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as Education[];
  } catch (error) {
    console.error("Error fetching education:", error);
    return [];
  }
}

export async function addEducation(
  education: Omit<Education, "id">,
): Promise<string> {
  const data = removeUndefined({
    ...education,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  const docRef = await addDoc(collection(db, "education"), data);
  return docRef.id;
}

export async function updateEducation(
  id: string,
  education: Partial<Education>,
): Promise<void> {
  const data = removeUndefined({
    ...education,
    updatedAt: Timestamp.now(),
  });
  await updateDoc(doc(db, "education", id), data);
}

export async function deleteEducation(id: string): Promise<void> {
  await deleteDoc(doc(db, "education", id));
}

// Skills
export async function getSkills(): Promise<Skill[]> {
  try {
    const q = query(collection(db, "skills"), orderBy("category"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Skill[];
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
}

export async function addSkill(skill: Omit<Skill, "id">): Promise<string> {
  const data = removeUndefined(skill as Record<string, unknown>);
  const docRef = await addDoc(collection(db, "skills"), data);
  return docRef.id;
}

export async function updateSkill(
  id: string,
  skill: Partial<Skill>,
): Promise<void> {
  const data = removeUndefined(skill as Record<string, unknown>);
  await updateDoc(doc(db, "skills", id), data as Record<string, import("firebase/firestore").FieldValue>);
}

export async function deleteSkill(id: string): Promise<void> {
  await deleteDoc(doc(db, "skills", id));
}

// Personal Info
export async function getPersonalInfo(): Promise<PersonalInfo | null> {
  try {
    const docRef = doc(db, "personalInfo", "main");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as PersonalInfo;
    }
    return null;
  } catch (error) {
    console.error("Error fetching personal info:", error);
    return null;
  }
}

export async function updatePersonalInfo(info: PersonalInfo): Promise<void> {
  const docRef = doc(db, "personalInfo", "main");
  const data: Record<string, unknown> = {
    name: info.name,
    title: info.title,
    bio: info.bio,
    email: info.email,
    location: info.location,
  };
  if (info.avatarUrl != null) data.avatarUrl = info.avatarUrl;
  if (info.socialLinks != null && Object.keys(info.socialLinks).length > 0) {
    data.socialLinks = Object.fromEntries(
      Object.entries(info.socialLinks).filter(([, v]) => v != null && v !== "")
    );
  }
  await setDoc(docRef, data, { merge: true });
}
