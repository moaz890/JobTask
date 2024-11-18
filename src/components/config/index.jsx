export const registerFormControls = [
    {
        name: "username",
        label: "Username",
        type: "text",
        placeholder: "Username....",
        componentType: "input",
    },
    {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "folan@example.com",
        componentType: "input",
    },
    {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Password",
        componentType: "input",
    },
    {
        name: "confirmPassword",
        label: "Confirm Password",
        type: "password",
        placeholder: "Confirm Password",
        componentType: "input",
    },
]

export const loginFormControls = [
    {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Email",
        componentType: "input",
    },
    {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Password",
        componentType: "input",
    },
]


export const createCategoryFormControls = [
    {
        name: "name",
        label: "Category Name",
        type: "text",
        placeholder: "Category Name",
        componentType: "input",
    },
    {
        name: "useTimeRestriction",
        label: "Use Time Restriction",
        type: "select",
        placeholder: "Use Time Restriction",
        componentType: "select",
        options: [
            {
                id: "yes",
                label: "Yes",
                value: 'true',
            },
            {
                id: "no",
                label: "No",
                value: 'false',
            },
        ],
    },
    
]

export const createItemFormControls = [
    {
        name: "name",
        label: "Item Name",
        type: "text",
        placeholder: "Item Name",
        componentType: "input",
    },
    {
        name: "description",
        label: "Item Description",
        type: "textarea",
        placeholder: "Item Description",
        componentType: "textarea",

    },
    {
        name: "price",
        label: "Item Price",
        type: "number",
        placeholder: "Item Price",
        componentType: "input",
    }
]