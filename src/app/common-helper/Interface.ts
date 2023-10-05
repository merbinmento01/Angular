export interface salesAndOpp {
    Year: Number,
    Sale: String,
    Opportunity: String,
}

export interface columnListInterface {
    cols: columnInterface[]
}

export interface columnInterface {
    field: String,
    header: String,
    isActive: boolean,
    required?: boolean,
}