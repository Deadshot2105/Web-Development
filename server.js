const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

const feedbackData = [];

const surveys = [
    {
        "id": 1,
        "title": "New student survey",
        "desc": "Questions for first year students",
        "nq": 2,
        "qs": ["3", "4"]
    },
    {
        "id": 2,
        "title": "Student survey",
        "desc": "Questions for master program students",
        "nq": 4,
        "qs": ["1", "2", "3", "4"]
    }
];

const questions = {
    "Bachelors": [
        {
            "id": 1,
            "type": "rate",
            "title": "Were you satisfied with the organization of the course?",
            "description": "On the scale between 1 (lowest) and 5 (highest) please rate organization of the course",
            "options": ["1", "2", "3", "4", "5"]
        },
        {
            "id": 3,
            "type": "rate",
            "title": "Rate our education center",
            "description": "On the scale between 1 (lowest) and 5 (highest) please rate our education center",
            "options": ["1", "2", "3", "4", "5"]
        }
    ],
    "Masters": [
        {
            "id": 2,
            "type": "rate",
            "title": "Were you satisfied with the content you got at the course?",
            "description": "On the scale between 1 (lowest) and 5 (highest) please rate content of the course",
            "options": ["1", "2", "3", "4", "5"]
        },
        {
            "id": 4,
            "type": "free",
            "title": "Why did you select this course?",
            "description": "Please describe the reasons why you selected the course",
            "options": []
        }
    ]
};

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

// Submit feedback endpoint
app.post('/submitFeedback', (req, res) => {
    const newFeedback = req.body;
    feedbackData.push(newFeedback);
    res.json({ success: true, message: 'Feedback submitted successfully!', feedback: newFeedback });
});

// Get all feedbacks endpoint
app.get('/feedbacks', (req, res) => {
    res.json(feedbackData);
});

// Get surveys with questions endpoint
app.get('/surveys', (req, res) => {
    const educationPhase = req.params.educationPhase;
    const surveysWithQuestions = surveys.map(survey => {
        const surveyQuestions = [];
        survey.qs.forEach(questionId => {
            const question = questions[survey.title].find(q => q.id === parseInt(questionId));
            if (question) {
                surveyQuestions.push(question);
            } else {
                console.error(`Question with ID ${questionId} not found for survey ${survey.id}`);
            }
        });
        return { ...survey, questions: surveyQuestions };
    });
    res.json(surveysWithQuestions);
});

// Get questions by education phase endpoint
app.get('/questions/:educationPhase', (req, res) => {
    const educationPhase = req.params.educationPhase;
    if (questions[educationPhase]) {
        res.json(questions[educationPhase]);
    } else {
        res.status(404).json({ error: 'Questions not found for the specified education phase' });
    }
});

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Web Page.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
