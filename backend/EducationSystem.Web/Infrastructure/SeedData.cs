using EducationSystem.Domain.Models;
using EducationSystem.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EducationSystem.Web.Infrastructure
{
    public static class SeedData
    {
        public static async Task Initialize(IServiceProvider serviceProvider)
        {
            using var scope = serviceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            // Apply any pending migrations
            await context.Database.MigrateAsync();

            // Check if we have any authors - if yes, assume the database has been seeded
            if (await context.Authors.AnyAsync())
            {
                return;
            }

            // Add authors
            var authors = GetAuthors();
            await context.Authors.AddRangeAsync(authors);
            await context.SaveChangesAsync();

            // Add courses
            var courses = GetCourses(authors);
            await context.Courses.AddRangeAsync(courses);
            await context.SaveChangesAsync();

            // Add quizzes
            var quizzes = GetQuizzes(courses);
            await context.Quizzes.AddRangeAsync(quizzes);
            await context.SaveChangesAsync();

            // Add questions with answers
            var questions = GetQuestionsWithAnswers(quizzes);
            await context.Questions.AddRangeAsync(questions);
            await context.SaveChangesAsync();
        }

        private static List<Author> GetAuthors()
        {
            return new List<Author>
            {
                new Author
                {
                    Id = Guid.NewGuid(),
                    Name = "Dr. Sarah Johnson",
                    Bio = "Dr. Sarah Johnson is a professor of Computer Science with over 15 years of teaching experience. She specializes in algorithms, data structures, and machine learning. She has published numerous papers on efficient algorithms and is passionate about making complex topics accessible to all students."
                },
                new Author
                {
                    Id = Guid.NewGuid(),
                    Name = "Prof. Michael Chen",
                    Bio = "Professor Michael Chen is an expert in web development and software engineering. With a background in both academic research and industry experience at major tech companies, he brings a practical approach to teaching programming concepts. He focuses on real-world applications and industry best practices."
                },
                new Author
                {
                    Id = Guid.NewGuid(),
                    Name = "Dr. Elena Rodriguez",
                    Bio = "Dr. Rodriguez holds a Ph.D. in Mathematics and has taught at prestigious universities worldwide. Her teaching philosophy centers on building strong foundational understanding through clear explanations and practical examples. She specializes in making mathematical concepts intuitive and applicable."
                }
            };
        }

        private static List<Course> GetCourses(List<Author> authors)
        {
            return new List<Course>
            {
                new Course
                {
                    Id = Guid.NewGuid(),
                    Title = "Introduction to Programming with C#",
                    Description = "This course provides a comprehensive introduction to programming using C#. Students will learn fundamental programming concepts including variables, control structures, functions, and object-oriented design. By the end of the course, students will be able to create simple applications and understand core programming principles.",
                    AuthorId = authors[0].Id
                },
                new Course
                {
                    Id = Guid.NewGuid(),
                    Title = "Web Development Fundamentals",
                    Description = "Learn the essential technologies that power the modern web. This course covers HTML, CSS, and JavaScript, providing students with the skills to create responsive and interactive websites. Students will build multiple projects to reinforce concepts and develop a portfolio of work.",
                    AuthorId = authors[1].Id
                },
                new Course
                {
                    Id = Guid.NewGuid(),
                    Title = "Database Design and SQL",
                    Description = "Master the principles of database design and learn to write effective SQL queries. This course covers relational database concepts, normalization, ER diagrams, and practical SQL for data manipulation. Students will design their own databases and implement complex queries to solve real-world problems.",
                    AuthorId = authors[0].Id
                },
                new Course
                {
                    Id = Guid.NewGuid(),
                    Title = "Calculus for Engineering",
                    Description = "This course introduces the fundamental concepts of calculus with applications in engineering and physics. Topics include limits, derivatives, integrals, and differential equations. Students will learn to apply these mathematical tools to solve problems related to motion, optimization, and rates of change.",
                    AuthorId = authors[2].Id
                },
                new Course
                {
                    Id = Guid.NewGuid(),
                    Title = "ASP.NET Core MVC Development",
                    Description = "Build modern web applications using ASP.NET Core MVC. This course covers the Model-View-Controller pattern, Entity Framework Core, identity and authentication, and deployment strategies. Students will develop a full-featured web application throughout the course.",
                    AuthorId = authors[1].Id
                }
            };
        }

        private static List<Quiz> GetQuizzes(List<Course> courses)
        {
            var quizzes = new List<Quiz>();

            // Quizzes for "Introduction to Programming with C#"
            quizzes.Add(new Quiz
            {
                Id = Guid.NewGuid(),
                Title = "C# Basics Assessment",
                CourseId = courses[0].Id
            });
            quizzes.Add(new Quiz
            {
                Id = Guid.NewGuid(),
                Title = "Object-Oriented Programming Concepts",
                CourseId = courses[0].Id
            });

            // Quizzes for "Web Development Fundamentals"
            quizzes.Add(new Quiz
            {
                Id = Guid.NewGuid(),
                Title = "HTML and CSS Fundamentals",
                CourseId = courses[1].Id
            });
            quizzes.Add(new Quiz
            {
                Id = Guid.NewGuid(),
                Title = "JavaScript Essentials",
                CourseId = courses[1].Id
            });

            // Quizzes for "Database Design and SQL"
            quizzes.Add(new Quiz
            {
                Id = Guid.NewGuid(),
                Title = "SQL Query Mastery",
                CourseId = courses[2].Id
            });
            quizzes.Add(new Quiz
            {
                Id = Guid.NewGuid(),
                Title = "Database Normalization",
                CourseId = courses[2].Id
            });

            // Quizzes for "Calculus for Engineering"
            quizzes.Add(new Quiz
            {
                Id = Guid.NewGuid(),
                Title = "Derivatives and Applications",
                CourseId = courses[3].Id
            });
            quizzes.Add(new Quiz
            {
                Id = Guid.NewGuid(),
                Title = "Integration Techniques",
                CourseId = courses[3].Id
            });

            // Quizzes for "ASP.NET Core MVC Development"
            quizzes.Add(new Quiz
            {
                Id = Guid.NewGuid(),
                Title = "MVC Architecture Quiz",
                CourseId = courses[4].Id
            });
            quizzes.Add(new Quiz
            {
                Id = Guid.NewGuid(),
                Title = "Entity Framework Core Assessment",
                CourseId = courses[4].Id
            });

            return quizzes;
        }

        private static List<Question> GetQuestionsWithAnswers(List<Quiz> quizzes)
        {
            var questions = new List<Question>();

            // Questions for "C# Basics Assessment"
            var cSharpBasicsQuestions = new List<Question>
            {
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "Which of the following is a value type in C#?",
                    QuizId = quizzes[0].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "string", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "int", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "object", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "class", IsCorrect = false }
                    }
                },
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "What is the correct way to declare a variable in C#?",
                    QuizId = quizzes[0].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "variable name = value;", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "name variable = value;", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "type name = value;", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "name type = value;", IsCorrect = false }
                    }
                },
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "Which statement is used to handle exceptions in C#?",
                    QuizId = quizzes[0].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "try-catch", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "if-else", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "switch-case", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "for-each", IsCorrect = false }
                    }
                },
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "What does the 'using' directive do in C#?",
                    QuizId = quizzes[0].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "Creates a new object", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "Imports a namespace", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "Defines a variable scope", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "Calls a method", IsCorrect = false }
                    }
                }
            };
            questions.AddRange(cSharpBasicsQuestions);

            // Questions for "Object-Oriented Programming Concepts"
            var oopQuestions = new List<Question>
            {
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "What is encapsulation in OOP?",
                    QuizId = quizzes[1].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "The ability to hide implementation details", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "The ability to create new instances", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "The ability to inherit from a base class", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "The ability to override methods", IsCorrect = false }
                    }
                },
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "Which keyword is used to create an instance of a class in C#?",
                    QuizId = quizzes[1].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "class", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "instance", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "new", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "create", IsCorrect = false }
                    }
                },
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "What is polymorphism in OOP?",
                    QuizId = quizzes[1].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "The ability of objects to maintain their state", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "The ability to create multiple objects", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "The ability to take many forms", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "The ability to hide data", IsCorrect = false }
                    }
                },
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "Which of the following defines a relationship where Class B 'is a' Class A?",
                    QuizId = quizzes[1].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "Composition", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "Aggregation", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "Inheritance", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "Association", IsCorrect = false }
                    }
                }
            };
            questions.AddRange(oopQuestions);

            // Questions for "HTML and CSS Fundamentals"
            var htmlCssQuestions = new List<Question>
            {
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "What does HTML stand for?",
                    QuizId = quizzes[2].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "Hyper Text Markup Language", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "Hyper Transfer Markup Language", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "High Tech Modern Language", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "Home Tool Markup Language", IsCorrect = false }
                    }
                },
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "Which CSS property is used to control text size?",
                    QuizId = quizzes[2].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "text-size", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "font-size", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "text-style", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "font-height", IsCorrect = false }
                    }
                },
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "Which HTML tag is used to create a hyperlink?",
                    QuizId = quizzes[2].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "<link>", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "<a>", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "<href>", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "<url>", IsCorrect = false }
                    }
                },
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "What is the correct CSS syntax for making all text elements bold?",
                    QuizId = quizzes[2].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "text {bold: true;}", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "text {font-weight: bold;}", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "text {style: bold;}", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "text {text-weight: bold;}", IsCorrect = false }
                    }
                }
            };
            questions.AddRange(htmlCssQuestions);

            // Questions for "JavaScript Essentials"
            var jsQuestions = new List<Question>
            {
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "What is the correct way to declare a JavaScript variable?",
                    QuizId = quizzes[3].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "variable name;", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "v name;", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "let name;", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "int name;", IsCorrect = false }
                    }
                },
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "How do you add a comment in JavaScript?",
                    QuizId = quizzes[3].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "<!-- comment -->", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "/* comment */", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "# comment", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "// comment", IsCorrect = true }
                    }
                },
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "Which function is used to parse a string to an integer in JavaScript?",
                    QuizId = quizzes[3].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "Integer.parse()", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "parseInt()", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "parseInteger()", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "Int.parse()", IsCorrect = false }
                    }
                },
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "What will the following code return: typeof []?",
                    QuizId = quizzes[3].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "array", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "object", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "undefined", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "null", IsCorrect = false }
                    }
                }
            };
            questions.AddRange(jsQuestions);

            // Questions for "SQL Query Mastery"
            var sqlQuestions = new List<Question>
            {
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "Which SQL statement is used to retrieve data from a database?",
                    QuizId = quizzes[4].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "GET", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "OPEN", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "SELECT", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "EXTRACT", IsCorrect = false }
                    }
                },
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "Which operator is used to compare a value to a list of values in SQL?",
                    QuizId = quizzes[4].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "BETWEEN", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "IN", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "LIKE", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "EXISTS", IsCorrect = false }
                    }
                },
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "What is the purpose of the GROUP BY clause in SQL?",
                    QuizId = quizzes[4].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "To filter the results of a query", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "To arrange rows in a specific order", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "To group rows that have the same values", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "To join tables together", IsCorrect = false }
                    }
                },
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "Which SQL function returns the current date and time?",
                    QuizId = quizzes[4].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "DATE()", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "GETDATE()", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "CURRENT()", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "NOW()", IsCorrect = true }
                    }
                }
            };
            questions.AddRange(sqlQuestions);

            // Add more questions for other quizzes following the same pattern
            // Database Normalization
            var normalizationQuestions = new List<Question>
            {
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "What is the main purpose of database normalization?",
                    QuizId = quizzes[5].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "To improve query performance", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "To reduce the size of the database", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "To eliminate data redundancy and dependency", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "To create more tables", IsCorrect = false }
                    }
                },
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "A table is in First Normal Form (1NF) if:",
                    QuizId = quizzes[5].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "It has a primary key", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "It has no repeating groups or arrays", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "It has no transitive dependencies", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "All non-key attributes depend on the entire primary key", IsCorrect = false }
                    }
                },
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "Which normal form addresses transitive dependencies?",
                    QuizId = quizzes[5].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "1NF", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "2NF", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "3NF", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "4NF", IsCorrect = false }
                    }
                },
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "What is a foreign key?",
                    QuizId = quizzes[5].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "A key used to encrypt database tables", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "A field that uniquely identifies each record in a table", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "A field that refers to the primary key in another table", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "A composite key made of multiple columns", IsCorrect = false }
                    }
                }
            };
            questions.AddRange(normalizationQuestions);

            // Derivatives and Applications
            var calculusDerivativesQuestions = new List<Question>
            {
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "What is the derivative of f(x) = x²?",
                    QuizId = quizzes[6].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "f'(x) = x", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "f'(x) = 2x", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "f'(x) = 2", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "f'(x) = x²", IsCorrect = false }
                    }
                },
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "What does the second derivative represent in terms of a graph?",
                    QuizId = quizzes[6].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "The slope at a point", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "The area under the curve", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "The concavity of the curve", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "The y-intercept", IsCorrect = false }
                    }
                },
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "What is the derivative of sin(x)?",
                    QuizId = quizzes[6].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "cos(x)", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "-sin(x)", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "tan(x)", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "-cos(x)", IsCorrect = false }
                    }
                },
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "In an optimization problem, where on a function do we typically find maximum/minimum values?",
                    QuizId = quizzes[6].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "Where the second derivative equals zero", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "Where the function equals zero", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "Where the first derivative equals zero", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "At the endpoints of the domain", IsCorrect = false }
                    }
                }
            };
            questions.AddRange(calculusDerivativesQuestions);

            // Integration Techniques
            var calculusIntegrationQuestions = new List<Question>
            {
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "What is the indefinite integral of f(x) = 2x?",
                    QuizId = quizzes[7].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "F(x) = x² + C", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "F(x) = x + C", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "F(x) = 2x² + C", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "F(x) = 2 + C", IsCorrect = false }
                    }
                },
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "Which integration technique is best for ∫sin(x)cos(x)dx?",
                    QuizId = quizzes[7].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "Integration by parts", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "U-substitution", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "Partial fractions", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "Trigonometric substitution", IsCorrect = false }
                    }
                },
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "What does the definite integral represent geometrically?",
                    QuizId = quizzes[7].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "The slope of the tangent line", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "The area under the curve", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "The length of the curve", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "The volume of revolution", IsCorrect = false }
                    }
                },
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "What is the integral of e^x?",
                    QuizId = quizzes[7].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "e^x + C", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "ln(x) + C", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "xe^x + C", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "1/e^x + C", IsCorrect = false }
                    }
                }
            };
            questions.AddRange(calculusIntegrationQuestions);

            // MVC Architecture Quiz
            var mvcQuestions = new List<Question>
            {
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "What does MVC stand for?",
                    QuizId = quizzes[8].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "Model View Component", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "Model View Controller", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "Main View Controller", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "Multiple View Components", IsCorrect = false }
                    }
                },
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "In the MVC pattern, which component handles user input?",
                    QuizId = quizzes[8].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "Model", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "View", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "Controller", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "Service", IsCorrect = false }
                    }
                },
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "What is the primary responsibility of the Model in MVC?",
                    QuizId = quizzes[8].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "Handling user requests", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "Rendering UI elements", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "Managing data and business logic", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "Routing requests to appropriate handlers", IsCorrect = false }
                    }
                },
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "Which class do controllers typically inherit from in ASP.NET Core MVC?",
                    QuizId = quizzes[8].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "BaseController", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "ControllerBase", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "WebController", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "HttpController", IsCorrect = false }
                    }
                }
            };
            questions.AddRange(mvcQuestions);

            // Entity Framework Core Assessment
            var efCoreQuestions = new List<Question>
            {
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "What is Entity Framework Core?",
                    QuizId = quizzes[9].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "A JavaScript framework", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "A database system", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "An ORM (Object-Relational Mapper)", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "A web server", IsCorrect = false }
                    }
                },
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "Which method is used to save changes to the database in Entity Framework Core?",
                    QuizId = quizzes[9].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "context.Save()", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "context.Update()", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "context.SaveChanges()", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "context.Commit()", IsCorrect = false }
                    }
                },
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "What is a DbContext in Entity Framework Core?",
                    QuizId = quizzes[9].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "A representation of a SQL query", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "A session with the database", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "A controller that handles database requests", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "A model that maps to a database table", IsCorrect = false }
                    }
                },
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "What is the purpose of migrations in Entity Framework Core?",
                    QuizId = quizzes[9].Id,
                    Answers = new List<Answer>
                    {
                        new Answer { Id = Guid.NewGuid(), Text = "To move data between different databases", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "To version the database schema and apply changes", IsCorrect = true },
                        new Answer { Id = Guid.NewGuid(), Text = "To convert between different database providers", IsCorrect = false },
                        new Answer { Id = Guid.NewGuid(), Text = "To migrate application settings between environments", IsCorrect = false }
                    }
                }
            };
            questions.AddRange(efCoreQuestions);

            return questions;
        }
    }
}