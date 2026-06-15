
import { endASession } from "@/lib/actions/actions";

export const endSessions = () => {
    const { trigger, isMutating, error } = endASession();

    const endSEssion = async (sessionId: string) => {
        try {
            return await trigger({
                sessionId: sessionId,
            });
        } catch (err) {
            console.log(err);
        }
    };

    return {
        endSEssion,
        isMutating,
        error,
    };

};




