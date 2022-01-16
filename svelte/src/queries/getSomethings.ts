import { Icons } from "../models/icon";
import { Something } from "../models/something";

export const getSomthings = async ():Promise<Something[]> => [
    new Something("AAAA", Icons.Account, "Blah blah blah"),
    new Something("AAAA", Icons.Account, "Blah blah blah"),
];

