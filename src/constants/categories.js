export const CATEGORIES = {
    "Home Maintenance": ["Plumbing", "Electrical", "Carpentry", "General Repair", "Home Repair", "Cleaning", "Moving"],
    "Wellness": ["Yoga Trainer", "Massage", "Physiotherapy", "Personal Training"],
    "Events": ["Photography", "Catering", "Decor", "Event Planning"],
    "Technology": ["Web Design", "PC Repair", "Mobile Repair", "Networking", "Tech Support"],
    "Academic": ["Tutoring"],
    "Other": ["Other"]
};

// Use concat for better compatibility than .flat()
export const ALL_SUB_CATEGORIES = ["All"].concat(...Object.values(CATEGORIES));
