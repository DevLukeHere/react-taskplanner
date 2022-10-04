# Limitations and Improvements for the Application

At the time of development one of the additions to allow subtasks to be nested under a parent task was proving to be 
a challenge to implement. In order to achieve this, a potential flow/algorithm that I was trying to implement is as follows:-

Task A (parent) => Task B (subtask) => Task C (subtask)

Assuming the above is the current task flow that was added by a user to the application. I would have a local variable and a
task object which are:-

let taskCounts = {}

task = {id, title, parent_id, parent_ids, status}

When Task A is created, it will be added to the local variable:-

task A = {id: 123, title: Task A, parent_id: "", parent_ids: [], "in_progress"} 

taskCounts = {123: {total_subtasks: 0, total_subtasks_done: 0, status: "in_progress"}}

When Task B is created but with the addition of a parent ID from Task A, it will also be added to taskCounts and will be updated:-

task B = {id: 456, title: Task B, parent_id: "123", parent_ids: [123], "in_progress"}

taskCounts = {123: {total_subtasks: 1, total_subtasks_done: 0, status: "in_progress"}, 456: {total_subtasks: 0, total_subtasks_done: 0, status: "in_progress"}}

When Task C is created but with the addition of a parent ID from Task B, it will also be added to the taskCounts and will be updated:-

task C = {id: 789, title: Task C, parent_id: "456", parent_ids: [123, 456], "in_progress"}

taskCounts = {123: {total_subtasks: 2, total_subtasks_done: 0, status: "in_progress"}, 456: {total_subtasks: 1, total_subtasks_done: 0, status: "in_progress"}, 789: {total_subtasks: 0, total_subtasks_done: 0, status: "in_progress"}}

This process of addition will repeat until the desired amount of subtasks are added. Based on the taskCounts variable we are able to determine the amount of tasks completed/done and update it's status. For example, if Task C has been checked:-

taskCounts = {123: {total_subtasks: 2, total_subtasks_done: 1, status: "in_progress"}, 456: {total_subtasks: 1, total_subtasks_done: 1, status: "in_progress"}, 789: {total_subtasks: 0, total_subtasks_done: 0, status: "completed"}}

task C = {id: 789, title: Task C, parent_id: "456", parent_ids: [123, 456], "completed"}

Based on the principle, taskCounts will be updated accordingly and will prevent a circular dependency.
