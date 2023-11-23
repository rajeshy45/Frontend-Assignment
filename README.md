# Frontend-Assignment

## React Form Builder using JSON schema
![image](https://github.com/rajeshy45/Frontend-Assignment/assets/73592971/f77db43c-4ea2-4bc5-bd97-0faf18f6f975)

## Live application URL
https://frontend-assignment-rajeshy45.vercel.app/

## Run locally
- npm install
- npm start

## UI Schema structure
We have multiple objects inside our UI-Schema JSON array. Different objects have the same set of fields but the structure might differ based on what kind of form element they are creating.
 
### Text Input Field (Pizza Name)
Code:
```JSON
{
    "sort": 1,
    "label": "Pizza Name",
    "description": "",
    "validate": {
        "required": true,
        "immutable": false
    },
    "jsonKey": "name",
    "uiType": "Input",
    "icon": "",
    "level": 0,
    "placeholder": ""
}
```

Here is the description for all the fields in the above object:
- "sort": This value decides the sequence of the main form or the outermost objects. It sorts the sections in the ascending order of values. For example, this will decide the sequence of Pizza Name, Pizza Type, Toppings, and Size.
- "label": This key holds the section label value.
- "description": This key holds the description value for each section/field. Every time the description value is not empty you will have to show an “i” or info icon next to the label. The description text has to be shown as a tooltip when hovered.
- "validate": This will be an object which will hold different validations like:
- "required": Whether this field/section is required or not. If it is required then you will have to show it upfront else you will have to show it when the user clicks on the advanced fields toggle button.
- "immutable": Whether the field is editable or not. “true” means non-editable and “false” would mean editable.
- "pattern": This will hold a regular expression for adding field validations.
- "jsonKey": This will hold a unique key for each field/section. This key will be used to send data to the backend.
- "uiType": This will tell the element type. For example, “Input”, “Number”, “Group”, “Select”, “Switch” etc.
- "level": The level value decides the nesting of fields. Refer to the Schema object for “Pizza Type” and “Slices”
- "placeholder": This will add a placeholder/hint text in the form fields.
 
### Group Field (Pizza Type)
```JSON
{
    "sort": 4,
    "label": "Pizza_type",
    "description": "",
    "validate": {
        "required": true,
        "immutable": false
    },
    "jsonKey": "pizza_type",
    "uiType": "Group",
    "icon": "",
    "level": 0,
    "placeholder": "",
    "subParameters": [
        . . .
    ]
}
```


Notice a few things in this UI Schema object:
- "sort": The value is 4, which is more than the first field which was “Pizza Name”
- "uiType": The value is a group. This UI type creates a section with multiple fields as shown in the screenshot below.

The group UI type will always have another field called “subParameters” which will contain all the fields inside the group. “subParameters” will be an array of more objects just like the kinds we have seen so far.
 
### Radio field (Pizza Types)
```JSON
{
    "sort": 0,
    "label": "Pizza_type Type",
    "description": "",
    "validate": {
        "required": true,
        "options": [
            {
                "label": "Naples Style Pizza",
                "value": "naples",
                "description": "",
                "icon": ""
            },
            {
                "label": "New York Style Pizza",
                "value": "newyork",
                "description": "",
                "icon": ""
            }
        ],
        "defaultValue": "naples",
        "immutable": false
    },
    "jsonKey": "type",
    "uiType": "Radio",
    "icon": "",
    "level": 1,
    "placeholder": ""
}
```


Notice a few things in this UI Schema object:
- “sort”: The value is 0 which means it needs to be the first in its group.
- “uiType”: every time the UI-Type is a “Radio” you will have to show it as tabs as shown in the screenshot below. You will always find the tab values in “options” which will be inside the “validate” key.
- “defaultValue”: This will decide which tab item needs to be selected by default.
 
### Show/Hide fields on tab click:
```JSON
{
    "sort": 10001,
    "label": "Naples Style Pizza",
    "description": "",
    "validate": {
        "required": true,
        "immutable": false
    },
    "jsonKey": "Naples",
    "uiType": "Ignore",
    "icon": "",
    "level": 1,
    "placeholder": "",
    "conditions": [
        {
            "jsonKey": "pizza_type.type",
            "op": "==",
            "value": "naples",
            "action": "enable"
        }
    ],
    "subParameters": []
}
```


How do you decide which fields to show when the first tab is clicked or when the second tab is clicked? You will have additional objects for all the fields which are to be under different tabs. Just like the “Radio field (Pizza Type)” these will be inside the “subParameters” key.
How will you know that these are not to be shown upfront but when a certain tab is selected? Look for two things:
“uiType” will be “Ignore”

- “conditions”: There will be an additional field called “conditions” which will decide when to enable/disable this field. As you can see in the code snippet above. If “pizza_type.type(jsonKey)” is “==(op)” to “naples(value)” then you will have to show all the fields which are inside the “subParameters” like slices.
 
### Select Field(Slices)
```JSON
{
    "sort": 10000,
    "label": "Slices",
    "description": "",
    "validate": {
        "required": true,
        "options": [
            {
                "label": "1",
                "value": "1",
                "description": "",
                "icon": ""
            },
            {
                "label": "2",
                "value": "2",
                "description": "",
                "icon": ""
            },
            {
                "label": "3",
                "value": "3",
                "description": "",
                "icon": ""
            },
            {
                "label": "4",
                "value": "4",
                "description": "",
                "icon": ""
            },
            {
                "label": "5",
                "value": "5",
                "description": "",
                "icon": ""
            }
        ],
        "defaultValue": "1",
        "immutable": false
    },
    "jsonKey": "slices",
    "uiType": "Select",
    "icon": "",
    "level": 2,
    "placeholder": ""
}
```


Notice a few things in this UI Schema object:
- “level”: The value is 2 which means that this is at two nestings. As you can see in the screenshot below, level-0 is the “Pizza type” group, level-1 is the tab to switch between the types of pizza and level-2 are the fields under each tab.
- “uiType”: The “Select” UI type is used to create dropdowns.
- “options”: All the select UI types will have this field which will be used to add the options in the dropdown.
