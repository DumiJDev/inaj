FROM maven:3.8-openjdk-11

WORKDIR /opt/app

COPY . .

RUN mvn clean package

CMD [ "java", "-jar", "./build/app.jar" ]