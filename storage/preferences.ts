import AsyncStorage from "@react-native-async-storage/async-storage";

const PREF_SCHOOL_ID = "pref/schoolId";

export async function getLastSchoolId(): Promise<string | null> {
    const schoolId = await AsyncStorage.getItem(PREF_SCHOOL_ID);
    if (!schoolId){
        return null;
    }
    return schoolId;
}

export async function setLastSchoolId(schoolId: string): Promise<void> {
    await AsyncStorage.setItem(PREF_SCHOOL_ID,schoolId);
}