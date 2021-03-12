
let addQuestionQuery = `
    mutation AddQuestion($input:QuestionMutationInput!){
        addQuestion(input:$input){
        question{
            id
        }
        }
    }  `;
let addOptionQuery = `
    mutation AddOption($input:OptionMutationInput!){
        addOption(input:$input){
        option{
            id
        }
        }
    }`;
let addExamQuery = `
    mutation AddExam($input:ExamMutationInput!){
        addExam(input:$input){
        exam{
            id
        }
        }
    }`;
export { addExamQuery, addOptionQuery, addQuestionQuery };