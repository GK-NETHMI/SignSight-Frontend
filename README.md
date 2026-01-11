# 🧠 Personalized Learning, Evaluation & Mentorship Component
### SignSight – Tamil Sign Language Intelligent Learning System

## 📌 Overview

This component handles **personalized learning, intelligent evaluation, explainable performance analysis, suspicious behavior detection, and mentor-guided support** within the SignSight platform.

It enhances Tamil Sign Language learning by adapting content to individual learners while ensuring **fair, transparent, and reliable assessments**.

---

## 🎯 Objectives

- Provide personalized learning paths for each learner  
- Predict learner performance using Machine Learning  
- Explain performance results using Explainable AI (XAI)  
- Detect suspicious behavior during quizzes  
- Enable mentor-guided monitoring and feedback  
- Improve fairness, transparency, and learning effectiveness  

---

## ✨ Core Features

### 🔹 Personalized Learning Engine
- Tracks learner performance across lessons and quizzes  
- Identifies weak learning areas such as:
  - Alphabet
  - Numbers
  - Family
  - Objects
  - Actions  
- Recommends targeted lessons and practice tutorials  

---

### 🔹 Machine Learning–Based Performance Prediction
- Uses a **Random Forest Regressor**
- Predicts overall learner performance score (0–100)
- Input features:
  - Category-wise quiz performance
  - Variation-wise sign performance  

---

### 🔹 Explainable AI (XAI) using SHAP
- Uses **SHAP (SHapley Additive Explanations)**
- Explains how each feature contributes to the predicted score
- Helps mentors and learners understand strengths and weaknesses
- Improves trust in AI-driven evaluation  

---

### 🔹 Suspicious Behavior Detection
- Applied during **sign-to-sign quiz video submissions**
- Detects:
  - Missing face or hands in video frames
  - Extremely short or invalid videos
  - Repeated video uploads  
- Flags suspicious attempts for mentor review  

---

### 🔹 Mentor-Guided Learning
- Every learner is assigned a mentor
- Mentors can:
  - Monitor learner progress
  - Review flagged quiz attempts
  - Provide feedback and guidance  
- Combines automated intelligence with human supervision  

---

## ⚙️ Technologies Used

| Layer | Technology |
|------|-----------|
| Backend | Flask (Python) |
| Machine Learning | Scikit-learn (Random Forest) |
| Explainable AI | SHAP |
| Data Processing | NumPy, Pandas |
| Video Processing | OpenCV |
| Frontend | React, Vite, Tailwind CSS |
| Security | Role-based access (User / Mentor) |

---

## 🔄 System Workflow

1. User completes lessons and quizzes  
2. Performance data is collected  
3. Category-wise and variation-wise scores are calculated  
4. ML model predicts overall performance score  
5. SHAP explains feature contributions  
6. Weak learning areas are identified  
7. Personalized recommendations are generated  
8. Suspicious attempts are flagged  
9. Mentor reviews progress and provides feedback  

---

## 🧪 API Endpoint

### `POST /api/evaluate-quiz`

**Inputs**
- Quiz data (JSON)
- Optional sign video file  

**Outputs**
- Accuracy and weighted score  
- Category-wise and variation-wise performance  
- Predicted performance score  
- SHAP-based explanations  
- Strengths and weaknesses  
- Personalized recommendations  
- Performance summary  

---

## 🚀 How to Run (Complete Setup)

#### 📦 Backend
```bash
cd backend
python app.py
```

---

#### 💻 Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 📊 Sample Output

- **Predicted Score**: 73.8%
- **Weak Area**: Numbers Variation
- **Recommendation**: Practice number-based sign tutorials
- **Mentor Alert**: Suspicious quiz attempt flagged

---
