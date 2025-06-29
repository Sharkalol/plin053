export type ClassResponse = {
    index: string;
    name: string;
    hit_die: number;
    proficiency_choices: {
        choose: number;
        from: {
            options: SkillOption[]
        }
    }[];
}

export type SkillOption = {
    option_type: string;
    item: {
        index: string;
        name: string;
        url: string;   
    }
}