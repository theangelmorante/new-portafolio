import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
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
  const docRef = await addDoc(collection(db, "projects"), {
    ...project,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function updateProject(
  id: string,
  project: Partial<Project>,
): Promise<void> {
  await updateDoc(doc(db, "projects", id), {
    ...project,
    updatedAt: Timestamp.now(),
  });
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
  const docRef = await addDoc(collection(db, "experiences"), {
    ...experience,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function updateExperience(
  id: string,
  experience: Partial<Experience>,
): Promise<void> {
  await updateDoc(doc(db, "experiences", id), {
    ...experience,
    updatedAt: Timestamp.now(),
  });
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
  const docRef = await addDoc(collection(db, "certifications"), {
    ...certification,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function updateCertification(
  id: string,
  certification: Partial<Certification>,
): Promise<void> {
  await updateDoc(doc(db, "certifications", id), {
    ...certification,
    updatedAt: Timestamp.now(),
  });
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
  const docRef = await addDoc(collection(db, "education"), {
    ...education,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function updateEducation(
  id: string,
  education: Partial<Education>,
): Promise<void> {
  await updateDoc(doc(db, "education", id), {
    ...education,
    updatedAt: Timestamp.now(),
  });
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
  const docRef = await addDoc(collection(db, "skills"), skill);
  return docRef.id;
}

export async function updateSkill(
  id: string,
  skill: Partial<Skill>,
): Promise<void> {
  await updateDoc(doc(db, "skills", id), skill);
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
  await updateDoc(doc(db, "personalInfo", "main"), {
    ...info,
  } as any);
}
