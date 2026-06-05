import { create } from "zustand";

// interface StudentAttendance {
//     id: string;
//     studentId: string;
//     sessionId: string;
//     checkInTime: string;
//     checkOutTime: string | null;
//     status: string;
//     verifiedById: string | null;
//     createdAt: string;
//     student: Student;
// }

// interface Student {
//     id: string;
//     fullName: string;
//     email: string;
//     password: string;
//     role: string;
//     isVerified: boolean;
//     verificationToken: string | null;
//     verificationTokenExpiresAt: string | null;
//     resetPasswordToken: string | null;
//     resetPasswordTokenExpiresAt: string | null;
//     createdAt: string;
//     updatedAt: string;
// }

interface AttendanceStore {
    attendanceData: any | null;
    setAttendanceData: (data: any) => void;
    clearAttendanceData: () => void;
}

interface SessionStore {
    sessionData: any | null;
    setSessionData: (data: any) => void;
    clearSessionData: () => void;
}

interface HistoryStore {
    historyData: any | null;
    setHistoryData: (data: any) => void;
    clearHistoryData: () => void;
}

export const useAttendanceStore = create<AttendanceStore>(
    (set) => ({
        attendanceData: null,
        setAttendanceData: (data) => set({ attendanceData: data }),
        clearAttendanceData: () => set({ attendanceData: null, }),
    })
);

export const useCourseStore = create<SessionStore>((set) => ({
    sessionData: null,
    setSessionData: (data) => set({ sessionData: data }),
    clearSessionData: () => set({ sessionData: null })
}));


export const useHistoryStore = create<HistoryStore>((set) => ({
    historyData: null,
    setHistoryData: (data) => set({ historyData: data }),
    clearHistoryData: () => set({ historyData: null }),
}));