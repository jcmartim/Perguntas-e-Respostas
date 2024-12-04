import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import Question from "./database/Question.js";
import Response from "./database/Response.js";
import slugify from "slugify";

const app = express();

// Simula __dirname no ES Module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  Question.findAll({ raw: true, order: [["id", "desc"]] }).then((questions) => {
    res.render("home", {
      ano: new Date().getFullYear(),
      questions,
    });
  });
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar", {
    ano: new Date().getFullYear(),
  });
});

app.get("/pergunta/:slug", (req, res) => {
  const slug = req.params.slug;
  Question.findOne({
    raw: true,
    where: { slug: slug },
  }).then((question) => {
    Response.findAll({
      raw: true,
      where: {question_id: question.id},
      order: [["id", "desc"]]
    }).then((answers) => {
      console.log(answers);
      question
        ? res.render("pergunta", {
            ano: new Date().getFullYear(),
            question,
            answers,
          })
        : res.redirect("/");
    });
  });
});

app.post("/save-question", (req, res) => {
  const title = req.body.title;
  const question = req.body.question;
  const slug = slugify(title, { lower: true, locale: "pt" });
  Question.create({
    title,
    question,
    slug,
  }).then(() => {
    res.redirect("/");
  });
});

app.post("/save-response", (req, res) => {
  const reply = req.body.reply;
  const question_id = parseInt(req.body.questionId);
  const slug = req.body.slug;
  Response.create({
    reply,
    question_id,
  }).then(() => {
    res.redirect(`/pergunta/${slug}`);
  });
});

app.listen(3000, () => {
  console.log("Servidor inicido na porta 3000");
});
