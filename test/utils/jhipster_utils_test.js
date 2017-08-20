/* eslint-disable no-unused-expressions */
const expect = require('chai').expect;

const fail = expect.fail;
const fs = require('fs');
const JHipsterUtils = require('../../lib/utils/jhipster_utils');

const isYoRcFilePresent = JHipsterUtils.isYoRcFilePresent;
const readJSONFiles = JHipsterUtils.readJSONFiles;
const checkForReservedClassName = JHipsterUtils.checkForReservedClassName;
const checkForReservedTableName = JHipsterUtils.checkForReservedTableName;
const checkForReservedFieldName = JHipsterUtils.checkForReservedFieldName;
const dateFormatForLiquibase = JHipsterUtils.dateFormatForLiquibase;

describe('JHipsterUtils', () => {
  describe('::isYoRcFilePresent', () => {
    it('returns whether the .yo-rc.json file exists', (done) => {
      expect(isYoRcFilePresent()).to.be.false;
      fs.open('.yo-rc.json', 'w', (error) => {
        if (error) {
          throw error;
        }
        expect(isYoRcFilePresent()).to.be.true;
        fs.unlinkSync('.yo-rc.json');
        done();
      });
    });
  });
  describe('::readJSONFiles', () => {
    describe('when passing valid entity names', () => {
      it('reads the files', () => {
        fs.mkdirSync('.jhipster');
        fs.writeFileSync('./.jhipster/A.json', '{"name": "toto"}');
        const read = readJSONFiles(['A']);
        expect(read.A.name).to.eq('toto');
        fs.unlinkSync('./.jhipster/A.json');
        fs.rmdirSync('.jhipster');
      });
    });
    describe('when passing entity names for files that do not exist', () => {
      it('does nothing', () => {
        fs.mkdirSync('.jhipster');
        const read = readJSONFiles(['A']);
        expect(read).to.deep.eq({});
        fs.rmdirSync('.jhipster');
      });
    });
    describe('when passing nothing', () => {
      it('fails', () => {
        try {
          readJSONFiles();
          fail();
        } catch (error) {
          expect(error.name).to.eq('IllegalArgumentException');
        }
      });
    });
  });
  describe('::checkForReservedClassName', () => {
    describe('when passing no arg', () => {
      it('doesn\'t fail', () => {
        checkForReservedClassName();
      });
    });
    describe('when passing valid args', () => {
      describe('with a valid class name', () => {
        it('doesn\'t fail', () => {
          checkForReservedClassName({
            name: 'Job',
            databaseTypeName: 'sql',
            shouldThrow: true
          });
        });
      });
      describe('with an invalid class name', () => {
        describe('with the shouldThrow flag to true', () => {
          it('fails', () => {
            try {
              checkForReservedClassName({
                name: 'Class',
                databaseTypeName: 'sql',
                shouldThrow: true
              });
              fail();
            } catch (error) {
              expect(error.name).to.eq('IllegalNameException');
            }
          });
        });
        describe('with the shouldThrow flag to false', () => {
          it('doesn\'t fail', () => {
            checkForReservedClassName({
              name: 'Class',
              databaseTypeName: 'sql',
              shouldThrow: false
            });
          });
        });
      });
    });
  });
  describe('::checkForReservedTableName', () => {
    describe('when passing no arg', () => {
      it('doesn\'t fail', () => {
        checkForReservedTableName();
      });
    });
    describe('when passing valid args', () => {
      describe('with a valid class name', () => {
        it('doesn\'t fail', () => {
          checkForReservedTableName({
            name: 'Job',
            databaseTypeName: 'sql',
            shouldThrow: true
          });
        });
      });
      describe('with an invalid class name', () => {
        describe('with the shouldThrow flag to true', () => {
          it('fails', () => {
            try {
              checkForReservedTableName({
                name: 'ANALYZE',
                databaseTypeName: 'sql',
                shouldThrow: true
              });
              fail();
            } catch (error) {
              expect(error.name).to.eq('IllegalNameException');
            }
          });
        });
        describe('with the shouldThrow flag to false', () => {
          it('doesn\'t fail', () => {
            checkForReservedTableName({
              name: 'ANALYZE',
              databaseTypeName: 'sql',
              shouldThrow: false
            });
          });
        });
      });
    });
  });
  describe('::checkForReservedFieldName', () => {
    describe('when passing no arg', () => {
      it('doesn\'t fail', () => {
        checkForReservedFieldName();
      });
    });
    describe('when passing valid args', () => {
      describe('with a valid class name', () => {
        it('doesn\'t fail', () => {
          checkForReservedFieldName({
            name: 'name',
            databaseTypeName: 'sql',
            shouldThrow: true
          });
        });
      });
      describe('with an invalid class name', () => {
        describe('with the shouldThrow flag to true', () => {
          it('fails', () => {
            try {
              checkForReservedFieldName({
                name: 'continue',
                databaseTypeName: 'sql',
                shouldThrow: true
              });
              fail();
            } catch (error) {
              expect(error.name).to.eq('IllegalNameException');
            }
          });
        });
        describe('with the shouldThrow flag to false', () => {
          it('doesn\'t fail', () => {
            checkForReservedFieldName({
              name: 'continue',
              databaseTypeName: 'sql',
              shouldThrow: false
            });
          });
        });
      });
    });
  });
  describe('::dateFormatForLiquibase', () => {
    describe('when passing both arguments', () => {
      it('uses the increment with the passed date', () => {
        const now = new Date();
        const increment = 1000042;
        const result =
          dateFormatForLiquibase({ date: now, increment });
        now.setSeconds(now.getUTCSeconds() + increment);
        const nowUTC = new Date(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate(),
          now.getUTCHours(),
          now.getUTCMinutes(),
          now.getUTCSeconds());
        const year = `${nowUTC.getFullYear()}`;
        let month = `${nowUTC.getMonth() + 1}`;
        if (month.length === 1) {
          month = `0${month}`;
        }
        let day = `${nowUTC.getDate()}`;
        if (day.length === 1) {
          day = `0${day}`;
        }
        let hour = `${nowUTC.getHours()}`;
        if (hour.length === 1) {
          hour = `0${hour}`;
        }
        let minute = `${nowUTC.getMinutes()}`;
        if (minute.length === 1) {
          minute = `0${minute}`;
        }
        let second = `${nowUTC.getSeconds()}`;
        if (second.length === 1) {
          second = `0${second}`;
        }
        expect(
          result
        ).to.equal(`${year}${month}${day}${hour}${minute}${second}`);
      });
    });
    describe('when not passing the date', () => {
      it('does not fail', () => {
        expect(dateFormatForLiquibase().length).to.equal(14);
      });
    });
    describe('when not passing the increment', () => {
      it('formats the current time for liquibase with no increment', () => {
        const now = new Date();
        const result = dateFormatForLiquibase({ date: now });
        const nowUTC = new Date(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate(),
          now.getUTCHours(),
          now.getUTCMinutes(),
          now.getUTCSeconds());
        const year = `${nowUTC.getFullYear()}`;
        let month = `${nowUTC.getMonth() + 1}`;
        if (month.length === 1) {
          month = `0${month}`;
        }
        let day = `${nowUTC.getDate()}`;
        if (day.length === 1) {
          day = `0${day}`;
        }
        let hour = `${nowUTC.getHours()}`;
        if (hour.length === 1) {
          hour = `0${hour}`;
        }
        let minute = `${nowUTC.getMinutes()}`;
        if (minute.length === 1) {
          minute = `0${minute}`;
        }
        let second = `${(nowUTC.getSeconds()) % 60}`;
        if (second.length === 1) {
          second = `0${second}`;
        }
        expect(
          result
        ).to.equal(`${year}${month}${day}${hour}${minute}${second}`);
      });
    });
  });
});
