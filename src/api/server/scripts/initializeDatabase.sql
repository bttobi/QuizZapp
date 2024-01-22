BEGIN;


CREATE TABLE IF NOT EXISTS public.users
(
    user_id bigserial NOT NULL,
    email character varying(200) NOT NULL,
    password character varying(200) NOT NULL,
    PRIMARY KEY (user_id),
    CONSTRAINT unique_email UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS public.quizzes
(
    quiz_id bigserial NOT NULL,
    quiz_name character varying(50) NOT NULL DEFAULT 'CUSTOM',
    category character varying(50) NOT NULL DEFAULT 'CUSTOM',
    user_id bigint,
    thumbnail_src character varying(500) DEFAULT 'https://i.imgur.com/CZaDkUQ.png',
    PRIMARY KEY (quiz_id)
);

CREATE TABLE IF NOT EXISTS public.questions
(
    question_id bigserial NOT NULL,
    quiz_id bigint NOT NULL,
    question character varying(1000) NOT NULL,
    answers character varying(2000)[] NOT NULL,
    correct character varying(500) NOT NULL,
    PRIMARY KEY (question_id)
);

CREATE TABLE IF NOT EXISTS public.leaderboard
(
    round_id bigserial NOT NULL,
    user_id bigint NOT NULL,
    quiz_id bigint NOT NULL DEFAULT 0,
    g_answers bigint[],
    b_answers bigint[],
    points bigint NOT NULL,
    PRIMARY KEY (round_id)
);

ALTER TABLE IF EXISTS public.quizzes
    ADD FOREIGN KEY (user_id)
    REFERENCES public.users (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.questions
    ADD FOREIGN KEY (quiz_id)
    REFERENCES public.quizzes (quiz_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public.leaderboard
    ADD FOREIGN KEY (user_id)
    REFERENCES public.users (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.leaderboard
    ADD FOREIGN KEY (quiz_id)
    REFERENCES public.quizzes (quiz_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE SET DEFAULT
    NOT VALID;

END;

-- View: public.leaderboardView

-- DROP VIEW public."leaderboardView";

CREATE OR REPLACE VIEW public."leaderboardView"
 AS
 SELECT row_number() OVER (ORDER BY points DESC) AS place,
    email,
    points,
    user_id
   FROM ( SELECT b.email,
            COALESCE(a.points, 0::numeric) AS points,
            b.user_id
           FROM ( SELECT users.user_id,
                    users.email
                   FROM users) b
             LEFT JOIN ( SELECT leaderboard.user_id,
                    COALESCE(sum(leaderboard.points), 0::numeric) AS points
                   FROM leaderboard
                  GROUP BY leaderboard.user_id) a ON a.user_id = b.user_id) c;

ALTER TABLE public."leaderboardView"
    OWNER TO default;

-- View: public.quizStats

-- DROP VIEW public."quizStats";

CREATE OR REPLACE VIEW public."quizStats"
 AS
 SELECT distinct u.user_id,
    l.quiz_id,
    l.points AS good_answers,
   array_length(l.b_answers, 1) AS bad_answers
   FROM users u
     LEFT JOIN leaderboard l ON u.user_id = l.user_id;

ALTER TABLE public."quizStats"
    OWNER TO default;

-- View: public.questionStats

-- DROP VIEW public."questionStats";

CREATE OR REPLACE VIEW public."questionStats"
 AS
 SELECT q.question_id,
    u.user_id,
    ( SELECT count(*) AS count
           FROM leaderboard
          WHERE leaderboard.user_id = u.user_id AND (q.question_id = ANY (leaderboard.g_answers))) AS count_good,
    ( SELECT count(*) AS count
           FROM leaderboard
          WHERE leaderboard.user_id = u.user_id AND (q.question_id = ANY (leaderboard.b_answers))) AS count_bad
   FROM questions q
     LEFT JOIN leaderboard l ON l.quiz_id = q.quiz_id
     LEFT JOIN users u ON u.user_id = l.user_id;


-- View: public.scoresView

-- DROP VIEW public."scoresView";

CREATE OR REPLACE VIEW public."scoresView"
 AS
 SELECT us.user_id,
    us.email,
    quizstats.overall_prof,
    ( SELECT quizzes.quiz_name AS best_quiz
           FROM quizzes
          WHERE quizzes.quiz_id = (( SELECT unnamed_subquery.quiz_id AS best_quiz
                   FROM ( SELECT "quizStats".quiz_id,
                            sum("quizStats".good_answers) / (sum("quizStats".good_answers) + sum("quizStats".bad_answers)::numeric) * 100::numeric AS quiz_prof
                           FROM "quizStats"
                          WHERE "quizStats".user_id = us.user_id
                          GROUP BY "quizStats".quiz_id
                          ORDER BY (sum("quizStats".good_answers) / (sum("quizStats".good_answers) + sum("quizStats".bad_answers)::numeric) * 100::numeric) DESC) unnamed_subquery
                 LIMIT 1))) AS best_quiz,
    ( SELECT unnamed_subquery.quiz_prof AS best_prof_quiz
           FROM ( SELECT "quizStats".quiz_id,
                    sum("quizStats".good_answers) / (sum("quizStats".good_answers) + sum("quizStats".bad_answers)::numeric) * 100::numeric AS quiz_prof
                   FROM "quizStats"
                  WHERE "quizStats".user_id = us.user_id
                  GROUP BY "quizStats".quiz_id
                  ORDER BY (sum("quizStats".good_answers) / (sum("quizStats".good_answers) + sum("quizStats".bad_answers)::numeric) * 100::numeric) DESC) unnamed_subquery
         LIMIT 1) AS best_prof_quiz,
    ( SELECT questions.question
           FROM questions
          WHERE questions.question_id = (( SELECT unnamed_subquery.question_id
                   FROM ( SELECT "questionStats".question_id,
                            "questionStats".count_good * 100 / ("questionStats".count_good + "questionStats".count_bad) AS question_prof
                           FROM "questionStats"
                          WHERE "questionStats".user_id = us.user_id
                          ORDER BY ("questionStats".count_good * 100 / ("questionStats".count_good + "questionStats".count_bad)) DESC) unnamed_subquery
                 LIMIT 1))) AS best_question,
    ( SELECT unnamed_subquery.question_prof
           FROM ( SELECT "questionStats".question_id,
                    "questionStats".count_good * 100 / ("questionStats".count_good + "questionStats".count_bad) AS question_prof
                   FROM "questionStats"
                  WHERE "questionStats".user_id = us.user_id
                  ORDER BY ("questionStats".count_good * 100 / ("questionStats".count_good + "questionStats".count_bad)) DESC) unnamed_subquery
         LIMIT 1) AS best_question_prof,
    ( SELECT quizzes.quiz_name
           FROM quizzes
          WHERE quizzes.quiz_id = (( SELECT unnamed_subquery.quiz_id AS worst_quiz
                   FROM ( SELECT "quizStats".quiz_id,
                            sum("quizStats".good_answers) / (sum("quizStats".good_answers) + sum("quizStats".bad_answers)::numeric) * 100::numeric AS quiz_prof
                           FROM "quizStats"
                          WHERE "quizStats".user_id = 1
                          GROUP BY "quizStats".quiz_id
                          ORDER BY (sum("quizStats".good_answers) / (sum("quizStats".good_answers) + sum("quizStats".bad_answers)::numeric) * 100::numeric)) unnamed_subquery
                 LIMIT 1))) AS worst_quiz,
    ( SELECT unnamed_subquery.quiz_prof AS worst_prof_quiz
           FROM ( SELECT "quizStats".quiz_id,
                    sum("quizStats".good_answers) / (sum("quizStats".good_answers) + sum("quizStats".bad_answers)::numeric) * 100::numeric AS quiz_prof
                   FROM "quizStats"
                  WHERE "quizStats".user_id = us.user_id
                  GROUP BY "quizStats".quiz_id
                  ORDER BY (sum("quizStats".good_answers) / (sum("quizStats".good_answers) + sum("quizStats".bad_answers)::numeric) * 100::numeric)) unnamed_subquery
         LIMIT 1) AS worst_prof_quiz,
    ( SELECT questions.question
           FROM questions
          WHERE questions.question_id = (( SELECT unnamed_subquery.question_id
                   FROM ( SELECT "questionStats".question_id,
                            "questionStats".count_good * 100 / ("questionStats".count_good + "questionStats".count_bad) AS question_prof
                           FROM "questionStats"
                          WHERE "questionStats".user_id = us.user_id
                          ORDER BY ("questionStats".count_good * 100 / ("questionStats".count_good + "questionStats".count_bad))) unnamed_subquery
                 LIMIT 1))) AS worst_question,
    ( SELECT unnamed_subquery.question_prof
           FROM ( SELECT "questionStats".question_id,
                    "questionStats".count_good * 100 / ("questionStats".count_good + "questionStats".count_bad) AS question_prof
                   FROM "questionStats"
                  WHERE "questionStats".user_id = us.user_id
                  ORDER BY ("questionStats".count_good * 100 / ("questionStats".count_good + "questionStats".count_bad))) unnamed_subquery
         LIMIT 1) AS worst_question_prof,
    ( SELECT quizzes.quiz_name
           FROM quizzes
          WHERE quizzes.quiz_id = (( SELECT unnamed_subquery.quiz_id
                   FROM ( SELECT "quizStats".quiz_id,
                            count(*) AS quiz_attempt
                           FROM "quizStats"
                          WHERE "quizStats".user_id = us.user_id
                          GROUP BY "quizStats".quiz_id
                          ORDER BY (count(*)) DESC) unnamed_subquery
                 LIMIT 1))) AS most_taken_quiz,
    ( SELECT unnamed_subquery.quiz_attempt
           FROM ( SELECT "quizStats".quiz_id,
                    count(*) AS quiz_attempt
                   FROM "quizStats"
                  WHERE "quizStats".user_id = us.user_id
                  GROUP BY "quizStats".quiz_id
                  ORDER BY (count(*)) DESC) unnamed_subquery
         LIMIT 1) AS most_taken_count,
    ( SELECT count(*) AS attempt_count
           FROM "quizStats"
          WHERE "quizStats".user_id = us.user_id) AS attempt_count,
    ( SELECT count(*) AS created_quizzes
           FROM quizzes
          WHERE quizzes.user_id = us.user_id) AS created_quizzes
   FROM users us
     LEFT JOIN ( SELECT "quizStats".user_id,
            sum("quizStats".good_answers) / (sum("quizStats".good_answers) + sum("quizStats".bad_answers)::numeric) * 100::numeric AS overall_prof
           FROM "quizStats"
          GROUP BY "quizStats".user_id) quizstats ON us.user_id = quizstats.user_id;





