const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express()
const bodyParser = require('body-parser');
const { formatDate } = require('./config');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(8081, () => {
    console.log("listening")
})

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "GraduateThesisSystem",
    multipleStatements: true
})

app.get('/', (req, res) => {
    return res.json("From Backend Side")
})

app.post('/login', (req, res) => {

    console.log(req.body)
    let username = req.body.username;
    let password = req.body.password;
    console.log(username)
    console.log(password)

    if (username && password) {

        const sql = `SELECT * FROM Login WHERE username='${username}' AND password='${password}'`;
        db.query(sql, (err, data) => {
            if(err) return res.json(err);

            return data.length > 0 ? res.send(true) : res.send(false);
        })
    } else {
        return res.send(false);
    }
});



app.post('/thesis-search', (req, res) => {

    let queryCount = 0;
    const {
        authorId,
        supervisorId,
        universityId,
        instituteId,
        title,
        abstract,
        type,
        year,
        language,
    } = req.body;

    let authorQuery = authorId != null && authorId != "" ? `AND AuthorID='${authorId}'` : "";
    let supervisorQuery = supervisorId != null && supervisorId != "" ? `AND AuthorID='${supervisorId}'` : "";
    let universityQuery = universityId != null && universityId != "" ? `AND UniversityID='${universityId}'` : "";
    let instituteQuery = instituteId != null && instituteId != "" ? `AND InstituteID='${instituteId}'` : "";
    let titleQuery = title != null && title != "" ? `AND Title LIKE '%${title}%'` : "";
    let abstractQuery = abstract != null && abstract != "" ? `AND Abstract LIKE '%${abstract}%'` : "";
    let typeQuery = type !== null && type != "" ? `AND Type='${type}'` : "";
    let yearQuery = year != null && year != "" ? `AND Year >= ${year}` : "";
    let languageQuery = language != null && language != "" ? `AND Language='${language}'` : "";

    let whereString = authorQuery + supervisorQuery + universityQuery + instituteQuery + titleQuery + abstractQuery + typeQuery + yearQuery + languageQuery;
    whereString = whereString.slice(3);
    console.log(whereString)
    if(whereString.length <= 0) return res.json({});

    const searchSql = `SELECT * FROM Thesis WHERE ${whereString}`;
    console.log(searchSql)
    db.query(searchSql, (err, data) => {
        if(err) return res.json(err);

        return res.json(data);
    })
});


/* FETCH DATA */
app.get('/thesis', (req, res) => {
    const sql = "SELECT *, DATE_FORMAT(SubmissionDate, \"%Y-%m-%d\") AS SubmissionDate FROM Thesis";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);

        return res.json(data);
    })
})
app.get('/thesis/:id', (req, res) => {

    const thesisNo = req.params.id;

    const sql = `SELECT * FROM Thesis WHERE ThesisNo='${thesisNo}'`;
    db.query(sql, (err, data) => {
        if(err) return res.json(err);

        return res.json(data);
    })
})
app.get('/thesis-subject/:id', (req, res) => {

    const thesisNo = req.params.id;

    const sql = `SELECT * FROM ThesisSubject WHERE ThesisNo='${thesisNo}'`;
    db.query(sql, (err, data) => {
        if(err) return res.json(err);

        return res.json(data);
    })
})
app.get('/thesis-keyword/:id', (req, res) => {

    const thesisNo = req.params.id;

    const sql = `SELECT * FROM Keyword WHERE ThesisNo='${thesisNo}'`;
    db.query(sql, (err, data) => {
        if(err) return res.json(err);

        return res.json(data);
    })
})

app.get('/persons', (req, res) => {
    const sql = "SELECT * FROM Person";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);

        return res.json(data);
    })
})
app.get('/supervisors', (req, res) => {
    const sql = "SELECT * FROM Supervisor";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);

        return res.json(data);
    })
})
app.get('/universities', (req, res) => {
    const sql = "SELECT * FROM University";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);

        return res.json(data);
    })
})
app.get('/institutes', (req, res) => {
    const sql = "SELECT * FROM Institute";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);

        return res.json(data);
    })
})

app.get('/thesis-types', (req, res) => {
    const sql = "SHOW COLUMNS FROM Thesis WHERE Field='Type'";
    db.query(sql, (err,data) => {
        if(err) return res.json(err);

        return res.json(data);
    })
})
app.get('/thesis-languages', (req, res) => {
    const sql = "SHOW COLUMNS FROM Thesis WHERE Field='Language'";
    db.query(sql, (err,data) => {
        if(err) return res.json(err);

        return res.json(data);
    })
})

app.get('/subjects', (req, res) => {
    const sql = "SELECT * FROM Subject";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);

        return res.json(data);
    })
})
app.get('/keywords', (req, res) => {
    const sql = "SELECT * FROM Keyword";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);

        return res.json(data);
    })
})

/* INSERT */
app.post('/thesis', (req, res) => {

    const {
        authorId,
        universityId,
        instituteId,
        title,
        abstract,
        year,
        type,
        pages,
        language,
        subjects,
        keywords
    } = req.body;
    const submissionDate = formatDate(new Date());
    const thesisSql = `INSERT INTO Thesis (Title, Abstract, AuthorID, Year, Type, UniversityID, InstituteID, Pages, Language, SubmissionDate) VALUES ('${title}', '${abstract}', '${authorId}', '${year}', '${type}', '${universityId}', '${instituteId}', '${pages}', '${language}', '${submissionDate}')`;

    db.query(thesisSql, (err, result) => {
        if (err) throw err;

        const thesisNo = result.insertId;
        const thesisNoSubjectID = subjects.map(i => [thesisNo, i]);
        const thesisNoKeywords = keywords.map(i => [thesisNo, i]);

        const thesisSubjectKeywordSql = 'INSERT INTO ThesisSubject (ThesisNo, SubjectID) VALUES ?;INSERT INTO Keyword (ThesisNo, Word) VALUES ?';
        db.query(thesisSubjectKeywordSql, [thesisNoSubjectID, thesisNoKeywords], (err, results, fields) => {
            if (err) throw err;

            console.log(`Inserted Rows: ${results.affectedRows}`);
            return res.send(true);
        });
    });
});

app.post('/person', (req, res) => {

    const { name } = req.body;
    const sql = `INSERT INTO Person (Name) VALUES ('${name}')`;

    db.query(sql, (err, data) => {
        if (err) throw err;

        console.log("1 record inserted");
        return res.send(true);
    });
});
app.post('/supervisor', (req, res) => {

    const { name, personId } = req.body;
    const sql = `INSERT INTO Supervisor (Name, PersonID) VALUES ('${name}', '${personId}')`;

    db.query(sql, (err, data) => {
        if (err) throw err;

        console.log("1 record inserted");
        return res.send(true);
    });
});
app.post('/university', (req, res) => {

    const { name } = req.body;
    const sql = `INSERT INTO University (Name) VALUES ('${name}')`;

    db.query(sql, (err, data) => {
        if (err) throw err;

        console.log("1 record inserted");
        return res.send(true);
    });
});
app.post('/institute', (req, res) => {

    const { name, universityId } = req.body;
    const sql = `INSERT INTO Institute (Name, UniversityID) VALUES ('${name}', '${universityId}')`;

    db.query(sql, (err, data) => {
        if (err) throw err;

        console.log("1 record inserted");
        return res.send(true);
    });
});
app.post('/subject', (req, res) => {

    const { name } = req.body;
    const sql = `INSERT INTO Subject (Topic) VALUES ('${name}')`;

    db.query(sql, (err, data) => {
        if (err) throw err;

        console.log("1 record inserted");
        return res.send(true);
    });
});

/* UPDATE */
app.put('/thesis/:id', (req, res) => {

    const thesisNo = req.params.id;
    const {
        authorId,
        universityId,
        instituteId,
        title,
        abstract,
        year,
        type,
        pages,
        language,
        subjects,
        keywords
    } = req.body;
    const thesisNoSubjectID = subjects.map(i => [thesisNo, i]);
    const thesisNoKeywords = keywords.map(i => [thesisNo, i]);

    const thesisUpdateSql = `UPDATE Thesis SET Title='${title}',Abstract='${abstract}',AuthorID='${authorId}',Year='${year}',Type='${type}',UniversityID='${universityId}',InstituteID='${instituteId}',Pages='${pages}',Language='${language}' WHERE ThesisNo='${thesisNo}'`;
    db.query(thesisUpdateSql, (err, data) => {
        if (err) throw err;

        const thesisSubjectKeywordRemoveSql = `DELETE FROM ThesisSubject WHERE ThesisNo='${thesisNo}';DELETE FROM Keyword WHERE ThesisNo='${thesisNo}'`;
        db.query(thesisSubjectKeywordRemoveSql, (err, data) => {
            if (err) throw err;

            const thesisSubjectKeywordSql = 'INSERT INTO ThesisSubject (ThesisNo, SubjectID) VALUES ?;INSERT INTO Keyword (ThesisNo, Word) VALUES ?';
            db.query(thesisSubjectKeywordSql, [thesisNoSubjectID, thesisNoKeywords], (err, results, fields) => {

                console.log(data.affectedRows + " record(s) updated");
                return res.send(true);
            });
        });
    });
});

app.put('/person/:id', (req, res) => {

    const personId = req.params.id;
    const { name } = req.body;

    const sql = `UPDATE Person SET Name='${name}' WHERE PersonID='${personId}'`;
    db.query(sql, (err, data) => {
        if (err) throw err;

        console.log(data.affectedRows + " record(s) updated");
        return res.send(true);
    });
});
app.put('/supervisor/:id', (req, res) => {

    const supervisorId = req.params.id;
    const { name } = req.body;

    const sql = `UPDATE Supervisor SET Name='${name}' WHERE SupervisorID='${supervisorId}'`;
    db.query(sql, (err, data) => {
        if (err) throw err;

        console.log(data.affectedRows + " record(s) updated");
        return res.send(true);
    });
});
app.put('/university/:id', (req, res) => {

    const universityId = req.params.id;
    const { name } = req.body;

    const sql = `UPDATE University SET Name='${name}' WHERE UniversityID='${universityId}'`;
    db.query(sql, (err, data) => {
        if (err) throw err;

        console.log(data.affectedRows + " record(s) updated");
        return res.send(true);
    });
});
app.put('/institute/:id', (req, res) => {

    const instituteId = req.params.id;
    const { name } = req.body;

    const sql = `UPDATE Institute SET Name='${name}' WHERE InstituteID='${instituteId}'`;
    db.query(sql, (err, data) => {
        if (err) throw err;

        console.log(data.affectedRows + " record(s) updated");
        return res.send(true);
    });
});
app.put('/subject/:id', (req, res) => {

    const subjectId = req.params.id;
    const { name } = req.body;

    const sql = `UPDATE Subject SET Topic='${name}' WHERE SubjectID='${subjectId}'`;
    db.query(sql, (err, data) => {
        if (err) throw err;

        console.log(data.affectedRows + " record(s) updated");
        return res.send(true);
    });
});

/* DELETE */
app.delete('/thesis/:id', (req, res) => {

    const thesisNo = req.params.id;

    const sql = `DELETE FROM Thesis WHERE ThesisNo='${thesisNo}'`;
    db.query(sql, (err, result) => {
        if (err) throw err;

        console.log("Number of records deleted: " + result.affectedRows);
        return res.send(true);
    });
});

app.delete('/person/:id', (req, res) => {

    const personId = req.params.id;

    const sql = `DELETE FROM Person WHERE PersonID='${personId}'`;
    db.query(sql, (err, result) => {
        if (err) throw err;

        console.log("Number of records deleted: " + result.affectedRows);
        return res.send(true);
    });
});
app.delete('/supervisor/:id', (req, res) => {

    const supervisorId = req.params.id;

    const sql = `DELETE FROM Supervisor WHERE SupervisorID='${supervisorId}'`;
    db.query(sql, (err, result) => {
        if (err) throw err;

        console.log("Number of records deleted: " + result.affectedRows);
        return res.send(true);
    });
});
app.delete('/university/:id', (req, res) => {

    const universityId = req.params.id;

    const sql = `DELETE FROM University WHERE UniversityID='${universityId}'`;
    db.query(sql, (err, result) => {
        if (err) throw err;

        console.log("Number of records deleted: " + result.affectedRows);
        return res.send(true);
    });
});
app.delete('/institute/:id', (req, res) => {

    const instituteId = req.params.id;

    const sql = `DELETE FROM Institute WHERE InstituteID='${instituteId}'`;
    db.query(sql, (err, result) => {
        if (err) throw err;

        console.log("Number of records deleted: " + result.affectedRows);
        return res.send(true);
    });
});
app.delete('/subject/:id', (req, res) => {

    const subjectId = req.params.id;

    const sql = `DELETE FROM Subject WHERE SubjectID='${subjectId}'`;
    db.query(sql, (err, result) => {
        if (err) throw err;

        console.log("Number of records deleted: " + result.affectedRows);
        return res.send(true);
    });
});