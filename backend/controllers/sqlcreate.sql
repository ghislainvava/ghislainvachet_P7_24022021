creer une structure nomer la : test


CREATE TABLE userGroupamania (id INT(11) AUTO_INCREMENT PRIMARY KEY, InputPseudo varchar(100),InputName varchar(100), InputLastName varchar(100), InputEmail varchar(255), InputPassword varchar(255), isAdmin tinyint(1)  );

CREATE TABLE PostGroupomania (id_Post INT(11) AUTO_INCREMENT PRIMARY KEY, id_User int(11) ,SujetPost varchar(500), date_post timestamp default CURRENT_TIMESTAMP, image varchar(100), FOREIGN Key (Id_User) REFERENCES userGroupamania (id) ON DELETE CASCADE );

CREATE TABLE CommentGroupomania (Id_commentaire INT(11) AUTO_INCREMENT PRIMARY KEY, id_PostComment int(11) , date_commentaire timestamp default CURRENT_TIMESTAMP, commentaire varchar(500), createur int(11), FOREIGN Key (createur ) REFERENCES PostGroupomania (id_User) ON DELETE CASCADE );

CREATE TABLE PostTextGroupomania (id_P INT(11) AUTO_INCREMENT PRIMARY KEY, id_U int(11) ,Sujet varchar(500), date_p timestamp default CURRENT_TIMESTAMP, FOREIGN Key (Id_U) REFERENCES userGroupamania (id) ON DELETE CASCADE );

CREATE TABLE CommentTextGroupomania (Id_Comment INT(11) AUTO_INCREMENT PRIMARY KEY, id_PostCommentaire int(11) , date_comment timestamp default CURRENT_TIMESTAMP, SujetComment varchar(500), id_Createur int(11), FOREIGN Key (id_Createur ) REFERENCES PostTextGroupomania (id_U) ON DELETE CASCADE );