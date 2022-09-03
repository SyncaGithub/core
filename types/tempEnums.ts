export enum EQtyType {
	UNIT = "UNIT",
	BOX = "BOX",
}

export enum ECashcowOrderStatus {
	PhoneBankTransfer = 1,
	Lead = 2,
	Paid = 4,
	Error = 5,
	Delivered = 6,
	PendingReview = 7,
	Cancaled = 8,
	Claimed = 9,
}

export enum EInject {
	Queue = "QUEUE_SERVICE",
}
